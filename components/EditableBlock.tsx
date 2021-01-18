import React, { useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { INote } from "../models/Project";
import { INewBlock } from "../pages/projects/[name]/[page]";

interface IContentEditable {
  note: INote;
  addBlock: (currentBlock: React.RefObject<HTMLElement>, newBlock: INewBlock) => void;
}

export function EditableBlock(props: IContentEditable) {
  const { note, addBlock } = props;
  const contentEditable = React.createRef<HTMLElement>();
  const [html, setHtml] = useState(note.text);
  const [previousKey, setPreviousKey] = useState("");
  const [htmlBackup, setHtmlBackup] = useState("");

  const updateText = (e: ContentEditableEvent) => {
    setHtml(e.target.value);
    note.updateText(e.target.value);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "/") {
      setHtmlBackup(note.text);
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addBlock(contentEditable, { text: "1", tag: "p" });
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
}
