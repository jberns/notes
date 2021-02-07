import { matchSorter } from "match-sorter";
import { useEffect, useState } from "react";
import { DP } from "./Dark";
import { NoteType } from "../models/Project";
export interface ISelectMenuProps {
  onSelect: (tag: Tag) => void;
  position: { x: number; y: number };
  closeSelectMenuHandler: () => void;
}

export type Tag = {
  id: string;
  tag: string;
  label: string;
  type: NoteType;
}

export const SelectMenu = (props: ISelectMenuProps) => {
  const { onSelect, position, closeSelectMenuHandler } = props;

  const MENU_HEIGHT = 150;
  const allowedTags:Tag[] = [
    { id: "title", tag: "h1", label: "Title", type: NoteType.note },
    { id: "heading", tag: "h2", label: "Heading", type: NoteType.note },
    { id: "subheading", tag: "h3", label: "SubHeading", type: NoteType.note },
    { id: "paragraph", tag: "p", label: "Paragraph", type: NoteType.note },
    { id: "task", tag: "p", label: "Task", type: NoteType.task },
  ];

  const [items, setItems] = useState(allowedTags);
  const [command, setCommand] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Enter":
        case "Tab":
          e.preventDefault();
          onSelect(items[selectedItemIndex]);
          break;

        case "Backspace":
          let currentCommand = "";

          setCommand((prevCommand) => {
            currentCommand = prevCommand;
            return prevCommand;
          });

          if (!currentCommand) {
            closeSelectMenuHandler();
            break;
          }

          setCommand((prevCommand) =>
            prevCommand.substring(0, prevCommand.length - 1)
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setSelectedItemIndex((prevSelected) => {
            if (prevSelected <= 0) return 0;

            return prevSelected - 1;
          });
          break;

        case "ArrowDown":
          e.preventDefault();
          setSelectedItemIndex((prevSelected) => {
            const itemsLength = items.length;
            if (prevSelected >= itemsLength - 1) return itemsLength - 1;

            return prevSelected + 1;
          });
          break;

        default:
          if (e.key.length === 1)
            setCommand((prevCommand) => prevCommand + e.key);
          break;
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return function cleanup() {
      return document.removeEventListener("keydown", keyDownHandler);
    };
  }, [items, selectedItemIndex]);

  useEffect(() => {
    const items = matchSorter(allowedTags, command, { keys: ["tag", "label"] });
    setItems(items);
    setSelectedItemIndex(0);
  }, [command]);

  return (
    <div
      className={`${DP.dp08} absolute z-10 shadow-lg mt-2 -ml-72 -mt-6 w-48 rounded-md py-1`}
      style={{ top: position.y, left: position.x }}
      role='menu'
      aria-orientation='vertical'
      aria-labelledby=''
    >
      {/* <p className='text-white'>Command: {command}</p>/ */}
      <div className='Items'>
        {items.map((item, key) => {
          const isSelected = items.indexOf(item) === selectedItemIndex;

          return (
            <div
              className={`
              ${isSelected ? "opacity-h-emp" : "opacity-l-emp"} 
              block text-white px-4 py-2 text-sm 
              hover:${DP.dp25} 
              hover:opacity-h-emp`}
              key={key}
              role='menuItem'
              tabIndex={0}
              onClick={() => onSelect(item)}
            >
              {item.label} - {item.tag}
            </div>
          );
        })}
      </div>
    </div>
  );
};
