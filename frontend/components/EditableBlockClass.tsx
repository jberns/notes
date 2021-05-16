import { Observer } from "mobx-react";
import React from "react";
import {
  Draggable,
  DraggableProvidedDraggableProps,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { IBlock, INote, IRootStore, NoteType } from "../models/Project";
import {
  IAddBlock,
  IPasteBlockReference,
  IDeleteBlock,
} from "../pages/projects/[projectId]/[pageId]";
import { MSTContext } from "../pages/_app";
import { getCaretCoordinates, setCaretToEnd } from "../utils";
import { PAGE_CONTAINER } from "../utils/constants";
import { ContextMenu, ContextTag } from "./ContextMenu";
import { DP } from "./Dark";
import { Selector } from "./Heroicons";
import { SelectMenu, Tag } from "./SelectMenu";

export type IContentEditable = {
  key: string;
  index: number;
  block: IBlock;
  addBlock: (props: IAddBlock) => void;
  pasteBlockReference: (props: IPasteBlockReference) => void;
  deleteBlock: (props: IDeleteBlock) => void;
  selectNextBlock: (index: number) => void;
  selectPreviousBlock: (index: number) => void;
};

type ContentEditableState = {
  store: IRootStore;
  html: string;
  htmlBackup: string;
  previousKey: string;
  selectMenuIsOpen: boolean;
  selectMenuPosition: { x: number; y: number };
  contextMenuIsOpen: boolean;
  contextMenuPosition: { x: number; y: number };
};

export class EditableBlock extends React.Component<
  IContentEditable,
  ContentEditableState
> {
  constructor(props: IContentEditable) {
    super(props);
    this.contentEditable = React.createRef<HTMLInputElement>();
    this.updateText = this.updateText.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.tagSelectionHandler = this.tagSelectionHandler.bind(this);
    this.contextSelectionHandler = this.contextSelectionHandler.bind(this);
    this.openSelectMenuHandler = this.openSelectMenuHandler.bind(this);
    this.closeSelectMenuHandler = this.closeSelectMenuHandler.bind(this);
    this.openContextMenuHandler = this.openContextMenuHandler.bind(this);
    this.closeContextMenuHandler = this.closeContextMenuHandler.bind(this);

    this.state = {
      //@ts-ignore will load in component did mount
      store: {},
      html: "",
      htmlBackup: "",
      previousKey: "",
      selectMenuIsOpen: false,
      selectMenuPosition: { x: 0, y: 0 },
      contextMenuIsOpen: false,
      contextMenuPosition: { x: 0, y: 0 },
    };
  }

  contentEditable: React.RefObject<HTMLInputElement>;
  static contextType = MSTContext;

  componentDidMount() {
    this.setState({
      store: this.context,
      html: this.props.block.content.text,
      htmlBackup: this.props.block.content.text,
    });

    // document.addEventListener("contextmenu", (event) => {
    //   event.preventDefault();
    //   // console.log(event)
    // });
  }

  componentWillUnmount() {
    // document.removeEventListener("contextmenu");
  }

  updateText(e: ContentEditableEvent) {
    const { content } = this.props.block;
    const sanitized = sanitizeHtml(e.target.value);

    content.updateText(sanitized);
    this.setState({ html: sanitized });
  }

  onKeyDownHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    const {
      block,
      index,
      addBlock,
      deleteBlock,
      selectNextBlock,
      selectPreviousBlock,
    } = this.props;
    const { content } = block;

    const { selectMenuIsOpen, html } = this.state;

    if (!selectMenuIsOpen) {
      if (e.key === "/") {
        this.setState({
          htmlBackup: html,
        });
      }

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        addBlock({
          index: index,
          newBlock: { text: "", tag: "p" },
        });
      }

      if (e.key === "Backspace" && !content.text) {
        e.preventDefault();
        deleteBlock({ id: block.id, index: index });
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectNextBlock(index);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        selectPreviousBlock(index);
      }
    } else {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
      }
    }

    this.setState({ previousKey: e.key });
  }

  onKeyUpHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "/") {
      this.openSelectMenuHandler();
    }

    if (e.key === "Escape") {
      this.closeSelectMenuHandler("none");
      this.closeContextMenuHandler();
    }

    console.log(e.key);
  }

  tagSelectionHandler = (tag: Tag) => {
    const { content } = this.props.block;
    const { htmlBackup } = this.state;

    content.updateTag(tag.tag);
    content.updateType(tag.type);
    content.updateText(htmlBackup);

    this.setState({ html: htmlBackup }, () => {
      this.closeSelectMenuHandler("none");
      this.contentEditable.current?.focus();
      if (this.contentEditable.current) {
        setCaretToEnd(this.contentEditable.current);
      }
    });
  };

  contextSelectionHandler = (
    action: ContextTag,
    index: number,
    note: INote
  ) => {
    const { store } = this.state;

    const { pasteBlockReference } = this.props;
    if (action.id === "copy") {
      store.setCopiedNote(note);
    }

    if (action.id === "paste") {
      const { copiedNote } = store;

      if (copiedNote) {
        pasteBlockReference({
          index: index,
          referenceContent: copiedNote,
        });
      }
    }

    console.log(note);
  };

  openSelectMenuHandler() {
    this.closeContextMenuHandler();

    const { content } = this.props.block;
    const { x, y } = getCaretCoordinates();

    const pageElement = document.querySelector(`#${PAGE_CONTAINER}`);
    const positionX = pageElement?.getBoundingClientRect().left || 0;
    const positionY = pageElement?.getBoundingClientRect().top || 0;
    const scrollY = pageElement?.scrollTop || 0;

    setTimeout(() => {
      document.addEventListener(
        "click",
        () => this.closeSelectMenuHandler("blur"),
        false
      );
    }, 100);

    this.setState({
      selectMenuIsOpen: true,
      selectMenuPosition: { x: x - positionX, y: y + scrollY - positionY },
    });
  }

  openContextMenuHandler(e: React.MouseEvent) {
    e.preventDefault();
    this.closeSelectMenuHandler("blur");

    const x = e.clientX;
    const y = e.clientY;

    const pageElement = document.querySelector(`#${PAGE_CONTAINER}`);
    const positionX = pageElement?.getBoundingClientRect().left || 0;
    const positionY = pageElement?.getBoundingClientRect().top || 0;
    const scrollY = pageElement?.scrollTop || 0;

    setTimeout(() => {
      document.addEventListener("click", this.closeContextMenuHandler, false);
    }, 100);

    this.setState({
      contextMenuIsOpen: true,
      contextMenuPosition: { x: x - positionX, y: y + scrollY - positionY },
    });
  }

  closeSelectMenuHandler = (action: "none" | "blur") => {
    if (action !== "blur") {
      this.contentEditable.current?.focus();
    }

    this.setState({
      selectMenuIsOpen: false,
      htmlBackup: "",
    });
  };

  closeContextMenuHandler = () => {
    // this.contentEditable.current?.focus();

    this.setState({
      contextMenuIsOpen: false,
    });
  };

  render = () => {
    const { block } = this.props;
    const { content } = block;
    const {
      selectMenuIsOpen,
      selectMenuPosition,
      contextMenuIsOpen,
      contextMenuPosition,
    } = this.state;

    const getItemStyle = (
      isDragging: DraggableStateSnapshot["isDragging"],
      draggableStyle: DraggableProvidedDraggableProps["style"]
    ) => ({
      userSelect: "none",
      ...draggableStyle,
      marginTop: "10px",
    });

    // TODO 2. Create edit menu on highlight

    return (
      <>
        {selectMenuIsOpen && (
          <SelectMenu
            position={selectMenuPosition}
            onSelect={this.tagSelectionHandler}
            closeMenuHandler={() => this.closeSelectMenuHandler("none")}
          />
        )}

        {contextMenuIsOpen && (
          <ContextMenu
            position={contextMenuPosition}
            onSelect={(action) =>
              this.contextSelectionHandler(
                action,
                this.props.index,
                this.props.block.content
              )
            }
            closeMenuHandler={() => this.closeSelectMenuHandler}
          />
        )}

        {content && (
          <Draggable
            key={block.id}
            draggableId={block.id}
            index={this.props.index}
          >
            {(provided, snapshot) => (
              <Observer>
                {() => (
                  <div
                    id={`${block.id}-draggable`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    //@ts-ignore userSelect is not on style as string properly
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    className='group'
                    onContextMenu={this.openContextMenuHandler}
                    // onBlur={(e) => {
                    //! Can't use onBlur handler because it closes the menu before an action is fired
                    //   this.closeContextMenuHandler();
                    //   this.closeSelectMenuHandler("blur");
                    // }}
                  >
                    <div className='flex'>
                      {content.type === NoteType.task && (
                        <div
                          className='z-10 mr-3 place-self-center'
                          style={{ padding: "5px" }}
                        >
                          <label className='inline-flex'>
                            <input
                              type='checkbox'
                              className='w-5 h-5 text-purple-600 bg-gray-200 rounded form-checkbox'
                              checked={content.complete}
                              onChange={(e) => {
                                content.updateStatus(!content.complete);
                              }}
                            />
                          </label>
                        </div>
                      )}

                      <div className={`flex w-full`}>
                        <ContentEditable
                          id={`${block.id}-ce`}
                          className={`
                          ${
                            content.complete
                              ? "opacity-l-emp line-through"
                              : "opacity-h-emp"
                          }
                          text-white whitespace-pre-wrap flex-1 cursor-auto 
                          rounded-md 
                          ${content.type == NoteType.task ? `${DP.dp06} ` : ""}
                          hover:${DP.dp16} 
                          focus:${DP.dp25}
                          hover:shadow-2xl 
                          `}
                          style={{ padding: "5px" }}
                          innerRef={this.contentEditable}
                          disabled={false} // if it is disabled on note.complete then it cant be navigated with arrows
                          // disabled={note.complete} // use true to disable editing/ handle innerHTML change
                          html={content.text}
                          tagName={content.tag}
                          onChange={this.updateText}
                          onKeyDown={this.onKeyDownHandler}
                          onKeyUp={this.onKeyUpHandler}
                        />
                        <span className='text-white opacity-0 place-self-center group-hover:opacity-l-emp'>
                          {Selector()}
                        </span>
                      </div>
                    </div>
                    {content.type == NoteType.task && (
                      <div
                        className='flex justify-end mr-6 text-xs text-white cursor-auto'
                        style={{ paddingBottom: "10px" }}
                      >
                        <div className='ml-6 opacity-l-emp'>
                          {content.createdOn.toLocaleTimeString()}
                        </div>
                        <div className='ml-6 opacity-l-emp'>
                          {content.assignedTo}
                        </div>
                        <button
                          className='ml-6 opacity-l-emp'
                          onClick={() => content.updateAssignedTo("Josh")}
                        >
                          Assign
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </Observer>
            )}
          </Draggable>
        )}
      </>
    );
  };
}
