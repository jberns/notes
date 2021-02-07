import React from "react";
import {
  Draggable,
  DraggableProvidedDraggableProps,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { INote, IRootStore, NoteType } from "../models/Project";
import {
  IAddBlock,
  IDeleteBlock,
} from "../pages/projects/[projectId]/[pageId]";
import { MSTContext } from "../pages/_app";
import { getCaretCoordinates, setCaretToEnd } from "../utils";
import { DP } from "./Dark";
import { SelectMenu } from "./SelectMenu";
import { Selector } from "./Heroicons";
import { Observer, observer } from "mobx-react";
import sanitizeHtml from "sanitize-html";
import { Tag } from "./SelectMenu";

export type IContentEditable = {
  key: string;
  index: number;
  note: INote;
  addBlock: (props: IAddBlock) => void;
  deleteBlock: (props: IDeleteBlock) => void;
  selectNextBlock: (ref: React.RefObject<HTMLInputElement>) => void;
  selectPreviousElement: (
    ref: React.RefObject<HTMLInputElement>
  ) => Element | null | undefined;
  selectPreviousBlock: (ref: Element | null | undefined) => void;
};

type ContentEditableState = {
  store: IRootStore;
  html: string;
  selectMenuIsOpen: boolean;
  previousKey: string;
  selectMenuPosition: { x: number; y: number };
  htmlBackup: string;
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
    this.openSelectMenuHandler = this.openSelectMenuHandler.bind(this);
    this.tagSelectionHandler = this.tagSelectionHandler.bind(this);
    this.closeSelectMenuHandler = this.closeSelectMenuHandler.bind(this);

    this.state = {
      //@ts-ignore will load in component did mount
      store: {},
      html: "",
      htmlBackup: "",
      selectMenuIsOpen: false,
      previousKey: "",
      selectMenuPosition: { x: 0, y: 0 },
    };
  }

  contentEditable: React.RefObject<HTMLInputElement>;
  static contextType = MSTContext;

  componentDidMount() {
    this.setState({
      store: this.context,
      html: this.props.note.text,
      htmlBackup: this.props.note.text,
    });
  }

  updateText(e: ContentEditableEvent) {
    const { note } = this.props;
    const sanitized = sanitizeHtml(e.target.value);

    note.updateText(sanitized);
    this.setState({ html: sanitized });
  }

  onKeyDownHandler(e: React.KeyboardEvent<HTMLDivElement>) {
    const {
      note,
      index,
      addBlock,
      deleteBlock,
      selectNextBlock,
      selectPreviousElement,
      selectPreviousBlock,
    } = this.props;

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
          ref: this.contentEditable,
          newBlock: { text: "", tag: "p" },
        });
      }

      if (e.key === "Backspace" && !note.text) {
        e.preventDefault();
        deleteBlock({ id: note.id, ref: this.contentEditable });
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectNextBlock(this.contentEditable);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const previousElement = selectPreviousElement(this.contentEditable);
        selectPreviousBlock(previousElement);
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
  }

  closeSelectMenuHandler = () => {
    this.contentEditable.current?.focus();

    this.setState({
      selectMenuIsOpen: false,
      htmlBackup: "",
    });
  };

  tagSelectionHandler = (tag: Tag) => {
    const { note } = this.props;
    const { htmlBackup } = this.state;

    note.updateTag(tag.tag);
    note.updateType(tag.type);
    note.updateText(htmlBackup);

    this.setState({ html: htmlBackup }, () => {
      this.closeSelectMenuHandler();
      this.contentEditable.current?.focus();
      if (this.contentEditable.current) {
        setCaretToEnd(this.contentEditable.current);
      }
    });
  };

  openSelectMenuHandler() {
    const { note } = this.props;
    const { x, y } = getCaretCoordinates();

    this.setState({
      selectMenuIsOpen: true,
      selectMenuPosition: { x, y },
    });
  }

  render = () => {
    const { note } = this.props;
    const { selectMenuIsOpen, selectMenuPosition } = this.state;

    const getItemStyle = (
      isDragging: DraggableStateSnapshot["isDragging"],
      draggableStyle: DraggableProvidedDraggableProps["style"]
    ) => ({
      userSelect: "none",
      ...draggableStyle,
    });

    // TODO 1. Add sanatize
    // TODO 2. Create edit menu on highlight

    return (
      <>
        {selectMenuIsOpen && (
          <SelectMenu
            position={selectMenuPosition}
            onSelect={this.tagSelectionHandler}
            closeSelectMenuHandler={this.closeSelectMenuHandler}
          />
        )}
        {note && (
          <Draggable
            key={note.id}
            draggableId={note.id}
            index={this.props.index}
          >
            {(provided, snapshot) => (
              <Observer>
                {() => (
                  <div
                    id={note.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    //@ts-ignore userSelect is not on style as string properly
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    className={`mt-2 group`}
                  >
                    <div className={`flex`}>
                      <ContentEditable
                        id={note.id}
                        className={`text-white opacity-l-emp flex-1 cursor-auto ${DP.dp06} rounded-md hover:${DP.dp16} hover:shadow-2xl focus:${DP.dp25}`}
                        style={{ padding: "5px" }}
                        innerRef={this.contentEditable}
                        disabled={false} // use true to disable editing/ handle innerHTML change
                        html={note.text}
                        tagName={note.tag}
                        onChange={this.updateText}
                        onKeyDown={this.onKeyDownHandler}
                        onKeyUp={this.onKeyUpHandler}
                      />
                      <span className='text-white place-self-center opacity-0 group-hover:opacity-l-emp'>
                        {Selector()}
                      </span>
                    </div>
                    {note.type == NoteType.task && (
                      <div
                        className={`flex text-white cursor-auto`}
                        style={{ paddingBottom: "10px" }}
                      >
                        <div className={`opacity-l-emp`}>{note.type}</div>
                        <div className={`opacity-l-emp ml-6`}>
                          {note.createdOn.toLocaleTimeString()}
                        </div>
                        <div className={`opacity-l-emp ml-6`}>
                          {note.assignedTo}
                        </div>
                        <button
                          className={`opacity-l-emp ml-6`}
                          onClick={() => note.updateAssignedTo("Josh")}
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
