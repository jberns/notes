import { observer } from "mobx-react";
import { string } from "mobx-state-tree/dist/internal";
import { storeDecorator } from "mobx/dist/internal";
import React, { useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { INote } from "../models/Project";
import { INewBlock } from "../pages/projects/[projectId]/[pageId]";
import { useMST } from "../pages/_app";
export interface IContentEditable {
  key: string;
  index: number;
  note: INote;
  addBlock: ({
    index,
    ref,
    newBlock,
  }: {
    index: number;
    ref: React.RefObject<HTMLElement>;
    newBlock: INewBlock;
  }) => void;
}


export const EditableBlock = observer((props: IContentEditable) => {
  const store = useMST();

  const { note, addBlock } = props;
  const contentEditable = React.createRef<HTMLElement>();
  const [html, setHtml] = useState(note.text);
  const [previousKey, setPreviousKey] = useState("");
  const [htmlBackup, setHtmlBackup] = useState("");

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
      addBlock({
        index: props.index,
        ref: contentEditable,
        newBlock: { text: "", tag: "p" },
      });
    }

    setPreviousKey(e.key);
  };

  return (
    <ContentEditable
      className='Block'
      innerRef={contentEditable}
      html={html}
      tagName={note.tag}
      onChange={updateText}
      onKeyDown={onKeyDownHandler}
    />
  );
});
