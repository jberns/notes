import { observer } from "mobx-react";
import React, { useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { INote, IRootStore, Note } from "../models/Project";
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
    this.getCaretCoordinates = this.getCaretCoordinates.bind(this);
    this.updateText = this.updateText.bind(this);
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.closeSelectMenuHandler = this.closeSelectMenuHandler.bind(this);
    this.tagSelectionHandler = this.tagSelectionHandler.bind(this);
    this.openSelectMenuHandler = this.openSelectMenuHandler.bind(this);

    this.state = {
      store: this.context,
      html: "",
      htmlBackup: "",
      selectMenuIsOpen: false,
      previousKey: "",
      selectMenuPosition: { x: 0, y: 0 },
    };
  }

  contentEditable: React.RefObject<HTMLInputElement>;
  static contextType = MSTContext;

  getCaretCoordinates = (fromStart = true) => {
    let x = 0;
    let y = 0;

    let selection = window.getSelection();
    let range = selection?.getRangeAt(0).cloneRange();
    range?.collapse(false);

    let rect = range?.getClientRects()[0];
    if (rect) {
      x = rect.left;
      y = rect.top;
    }

    return { x, y };
  };

  componentDidMount() {
    this.setState({ ...this.state, store: this.context });
  }

  updateText = (e: ContentEditableEvent) => {
    const { note } = this.props;

    this.setState({
      ...this.state,
      html: e.target.value,
    });

    note.updateText(e.target.value);
  };

  onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { addBlock, index, deleteBlock, note } = this.props;

    if (e.key === "/") {
      this.setState({
        ...this.state,
      });
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log("ref", this.contentEditable);
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

    this.setState({
      ...this.state,
      previousKey: e.key,
    });
  };

  onKeyUpHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "/") {
      this.openSelectMenuHandler();
    }
  };

  closeSelectMenuHandler = () => {
    const { note } = this.props;

    note.updateText(this.state.htmlBackup);

    this.setState({
      ...this.state,
      selectMenuIsOpen: false,
      htmlBackup: "",
    });
  };

  tagSelectionHandler = (tag: string) => {
    const { note } = this.props;

    note.updateTag(tag);
    this.closeSelectMenuHandler();
  };

  openSelectMenuHandler = () => {
    const { x, y } = this.getCaretCoordinates();

    this.setState({
      ...this.state,
      htmlBackup: this.state.html.slice(0, -1),
      selectMenuIsOpen: true,
      selectMenuPosition: { x, y },
    });
  };

  render = () => {
    const { note, addBlock, deleteBlock } = this.props;
    const { selectMenuIsOpen, selectMenuPosition } = this.state;

    return (
      <>
        {selectMenuIsOpen && (
          <SelectMenu
            position={selectMenuPosition}
            onSelect={this.tagSelectionHandler}
          />
        )}
        {
          <ContentEditable
            className={`Block p-1 my-1 ${DP.dp06} rounded-md hover:${DP.dp25} hover:shadow-2xl`}
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
