import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import 'twin.macro';
import tw, { css } from 'twin.macro';

interface IMentionList {
  children?: React.ReactNode;
  items: any[];
  command: any;
}

const MenuContainer = tw.div`
  flex
  flex-col
  bg-black
  text-left
  rounded-md
  shadow
  p-2
`;

const menuHoverStyles = css`
  &.is-selected,
  &:hover {
    ${tw`text-white bg-indigo-600`}
  }
`;

const MenuButton = tw.button`
  min-w-[150px]
  text-sm
  text-left
  my-0.5
  py-1
  px-2
  rounded-sm
  text-white
  !text-opacity-h-emp
`;

export const MentionList = forwardRef((props: IMentionList, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command({ id: index, label: item });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length,
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectedItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <MenuContainer>
      {props.items.map((item, index) => (
        <MenuButton
          className={`${index === selectedIndex ? 'is-selected' : ''}`}
          css={menuHoverStyles}
          key={index}
          onClick={() => selectedItem(index)}
        >
          {item}
        </MenuButton>
      ))}
    </MenuContainer>
  );
});

MentionList.displayName = 'MentionList';
