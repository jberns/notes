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

import { getCaretCoordinates, setCaretToEnd } from "../utils";

export interface IContentEditable {
  key: string;
  index: number;
  note: INote;
  addBlock: (props: IAddBlock) => void;
  deleteBlock: (props: IDeleteBlock) => void;
  selectNextBlock: (ref: React.RefObject<HTMLInputElement>) => void;
  selectPreviousBlock: (ref: React.RefObject<HTMLInputElement>) => void;
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
        selectPreviousBlock(this.contentEditable);
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
          <ContentEditable
            id={note.id}
            className={`Block p-1 my-1 ${DP.dp06} rounded-md hover:${DP.dp16} hover:shadow-2xl focus:${DP.dp25}` }
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
