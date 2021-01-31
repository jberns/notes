import { observer } from "mobx-react";
import { string } from "mobx-state-tree/dist/internal";
import { storeDecorator } from "mobx/dist/internal";
import React, { useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { INote } from "../models/Project";
import {
  IAddBlock,
  IDeleteBlock,
} from "../pages/projects/[projectId]/[pageId]";
import { MSTContext, useMST } from "../pages/_app";
import { SelectMenu } from "./SelectMenu";
import { Dark, DP } from "./Dark";

export interface IContentEditable {
  key: string;
  index: number;
  note: INote;
  addBlock: (props: IAddBlock) => void;
  deleteBlock: (props: IDeleteBlock) => void;
}

export class EditableBlock extends React.Component<IContentEditable> {
  contentEditable: React.RefObject<unknown>;
  constructor(props: IContentEditable) {
    super(props);
    this.contentEditable = React.createRef<HTMLInputElement>();
    this.state = { store: this.context, html: "<b>Hello <i>World</i></b>" };
  }
  static contextType = MSTContext;

  getCaretCoordinates = (fromStart = true) => {
    let x = 0;
    let y = 0;
    
    let selection = window.getSelection();
    let range = selection?.getRangeAt(0).cloneRange();
    range!.collapse(false);
    let rect = range?.getClientRects()[0];
    if (rect) {
      x = rect.left;
      y = rect.top;
    }

    console.log(selection);
    console.log(x, y);

    return { x, y };
  };

  componentDidMount() {
    this.setState({ ...this.state, store: this.context });
  }

  updateText = (e: ContentEditableEvent) => {
    this.setState({
      ...this.state,
      html: e.target.value,
    });

    this.getCaretCoordinates();

    this.props.note.updateText(e.target.value);
    console.log(this.state);
    this.state?.store?.updateNote(this.props.note.id, e.target.value);
  };

  onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "/") {
      // setHtmlBackup(note.text);
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("ref", contentEditable);
      addBlock({
        index: props.index,
        ref: contentEditable,
        newBlock: { text: "", tag: "p" },
      });
    }

    if (e.key === "Backspace" && !note.text) {
      e.preventDefault();
      deleteBlock({ id: note.id, ref: contentEditable });
    }

    this.setState({
      ...this.state,
      previouskey: e.key,
    });
  };

  onKeyUpHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "/") {
      console.log("/ key up");
      this.openSelectMenuHandler();
    }
  };

  closeSelectMenuHandler = () => {
    // setHtmlBackup("");
    // setSelectMenuIsOpen(false);
  };

  tagSelectionHandler = (tag: string) => {
    console.log("Selected tag", tag);
    note.updateTag(tag);
    closeSelectMenuHandler();
  };

  openSelectMenuHandler = () => {
    const { x, y } = this.getCaretCoordinates();
    console.log(x, y);

    this.setState({
      ...this.state,
      selectMenuIsOpen: true,
      selectMenuPosition: { x, y },
    });
  };

  render = () => {
    const { note, addBlock, deleteBlock } = this.props;
    return (
      <>
        {this.state.selectMenuIsOpen && (
          <SelectMenu
            position={this.state.selectMenuPosition}
            onSelect={this.tagSelectionHandler}
          />
        )}
        {
          <ContentEditable
            innerRef={this.contentEditable}
            disabled={false} // use true to disable editing/ handle innerHTML change
            html={note.text}
            tagName={note.tag}
            onChange={this.updateText}
            onKeyDown={this.onKeyDownHandler}
            onKeyUp={this.onKeyUpHandler}
          />
        }
      </>
    );
  };
}

export const EditableBlock2 = observer((props: IContentEditable) => {
  const store = useMST();
  const contentEditable = React.createRef<HTMLInputElement>();

  const { note, addBlock, deleteBlock } = props;

  const [html, setHtml] = useState(note.text);
  const [previousKey, setPreviousKey] = useState("");
  const [htmlBackup, setHtmlBackup] = useState("");
  const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);
  const [selectMenuPosition, setSelectMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const updateText = (e: ContentEditableEvent) => {
    setHtml(e.target.value);
    note.updateText(e.target.value);
    store.updateNote(note.id, e.target.value);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "/") {
      setHtmlBackup(note.text);
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("ref", contentEditable);
      addBlock({
        index: props.index,
        ref: contentEditable,
        newBlock: { text: "", tag: "p" },
      });
    }

    if (e.key === "Backspace" && !note.text) {
      e.preventDefault();
      deleteBlock({ id: note.id, ref: contentEditable });
    }

    setPreviousKey(e.key);
  };

  const onKeyUpHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "/") {
      console.log("/ key up");
      openSelectMenuHandler();
    }
  };

  const closeSelectMenuHandler = () => {
    setHtmlBackup("");
    setSelectMenuIsOpen(false);
  };

  const tagSelectionHandler = (tag: string) => {
    console.log("Selected tag", tag);
    note.updateTag(tag);
    closeSelectMenuHandler();
  };

  // const getCaretCoordinates = (fromStart = true) => {
  //   let x = 0, y = 0;
  //   const isSupported = typeof window.getSelection !== "undefined";
  //   if (isSupported) {
  //     const selection = window.getSelection();
  //     console.log({ selection });
  //     if (selection!.rangeCount !== 0) {
  //       const range = selection!.getRangeAt(0).cloneRange();
  //       range.collapse(fromStart ? true : false);
  //       const rect = range.getClientRects()[0];
  //       if (rect) {
  //         x = rect.left;
  //         y = rect.top;
  //       }
  //     }
  //   }
  //   return { x, y };
  // };

  const getCaretCoordinates = (fromStart = true) => {
    let x = 0,
      y = 0;
    let selection = window.getSelection();
    let range = selection?.getRangeAt(0).cloneRange();
    range?.collapse(false);
    let rect = range?.getClientRects();
    console.log("rect", selection?.getRangeAt(0));
    // x = rect![0].left
    // y = rect![0].top

    return { x, y };
  };

  const openSelectMenuHandler = () => {
    const { x, y } = getCaretCoordinates();
    console.log(x, y);
    setSelectMenuPosition({ x, y });
    setSelectMenuIsOpen(true);
  };

  return (
    <>
      {selectMenuIsOpen && (
        <SelectMenu
          position={selectMenuPosition}
          onSelect={tagSelectionHandler}
        />
      )}
      {console.log(contentEditable)}
      <ContentEditable
        className={`Block py-2 my-2 ${DP.dp12}`}
        innerRef={contentEditable}
        html={html}
        tagName={note.tag}
        onChange={updateText}
        onKeyDown={onKeyDownHandler}
        onKeyUp={onKeyUpHandler}
      />
    </>
  );
});
