import React from "react";
import {
  Draggable,
  DraggableProvidedDraggableProps,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { INote, IRootStore } from "../models/Project";
import {
  IAddBlock,
  IDeleteBlock,
} from "../pages/projects/[projectId]/[pageId]";
import { MSTContext } from "../pages/_app";
import { getCaretCoordinates, setCaretToEnd } from "../utils";
import { DP } from "./Dark";
import { SelectMenu } from "./SelectMenu";

export interface IContentEditable {
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
}

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
      store: this.context,
      html: props.note.text,
      htmlBackup: props.note.text,
      selectMenuIsOpen: false,
      previousKey: "",
      selectMenuPosition: { x: 0, y: 0 },
    };
  }

  contentEditable: React.RefObject<HTMLInputElement>;
  static contextType = MSTContext;

  componentDidMount() {
    this.setState({ store: this.context });
  }

  updateText(e: ContentEditableEvent) {
    const { note } = this.props;

    note.updateText(e.target.value);

    this.setState({ html: e.target.value });
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
        console.log("DETECTED KEYDOWN");
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

  tagSelectionHandler = (tag: string) => {
    const { note } = this.props;
    const { htmlBackup } = this.state;

    note.updateTag(tag);
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

    return (
      <>
        {selectMenuIsOpen && (
          <SelectMenu
            position={selectMenuPosition}
            onSelect={this.tagSelectionHandler}
            closeSelectMenuHandler={this.closeSelectMenuHandler}
          />
        )}
        {
          <Draggable
            key={note.id}
            draggableId={note.id}
            index={this.props.index}
          >
            {(provided, snapshot) => (
              <div
                id={note.id}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                //@ts-ignore userSelect is not on style
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
                className={`mt-2 group flex`}
              >
                <ContentEditable
                  id={note.id}
                  className={`flex-1 cursor-auto ${DP.dp06} rounded-md hover:${DP.dp16} hover:shadow-2xl focus:${DP.dp25}`}
                  style={{ padding: "5px" }}
                  innerRef={this.contentEditable}
                  disabled={false} // use true to disable editing/ handle innerHTML change
                  html={note.text}
                  tagName={note.tag}
                  onChange={this.updateText}
                  onKeyDown={this.onKeyDownHandler}
                  onKeyUp={this.onKeyUpHandler}
                />
                <span className='ml-2 place-self-center opacity-0 group-hover:opacity-100'>
                  :
                </span>
              </div>
            )}
          </Draggable>
        }
      </>
    );
  };
}
