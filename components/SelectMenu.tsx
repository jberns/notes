import { useState, useEffect, useRef, EventHandler, useCallback } from "react";
import { matchSorter } from "match-sorter";
import { Dark, DP } from "./Dark";
export interface ISelectMenuProps {
  onSelect: (tag: string) => void;
  position: { x: number; y: number };
  closeSelectMenuHandler: () => void;
}

export const SelectMenu = (props: ISelectMenuProps) => {
  const { onSelect, position, closeSelectMenuHandler } = props;

  const MENU_HEIGHT = 150;
  const allowedTags = [
    { id: "title", tag: "h1", label: "Title" },
    { id: "heading", tag: "h2", label: "Heading" },
    { id: "subheading", tag: "h3", label: "SubHeading" },
    { id: "paragraph", tag: "p", label: "Paragraph" },
  ];

  const [items, setItems] = useState(allowedTags);
  const [command, setCommand] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const keyDownHandler = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        setSelectedItemIndex((index) => {
          setItems((items) => {
            onSelect(items[index].tag);
            return items;
          });
          return index;
        });
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
      case "Tab":
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

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);

    return function cleanup() {
      return document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  useEffect(() => {
    const items = matchSorter(allowedTags, command, { keys: ["tag", "label"] });
    setItems(items);
    setSelectedItemIndex(0);
  }, [command]);

  return (
    <div
      className={`${DP.dp25} absolute shadow-lg mt-2 -ml-72 -mt-6 w-48 rounded-md py-1`}
      style={{ top: position.y, left: position.x }}
      role='menu'
      aria-orientation='vertical'
      aria-labelledby=''
    >
      {console.log(position)}
      <p className='text-white'>Command: {command}</p>
      <div className='Items'>
        {items.map((item, key) => {
          const isSelected = items.indexOf(item) === selectedItemIndex;

          return (
            <div
              className={`${
                isSelected ? "opacity-h-emp" : "opacity-l-emp"
              } block text-white px-4 py-2 text-sm hover:${
                DP.dp06
              } hover:opacity-h-emp`}
              key={key}
              role='menuItem'
              tabIndex={0}
              onClick={() => onSelect(item.tag)}
            >
              {item.label} - {item.tag}
            </div>
          );
        })}
      </div>
    </div>
  );
};
