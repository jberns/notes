import { DP } from './Dark';

export interface ISelectMenuProps {
  onSelect: (tag: ContextTag) => void;
  position: { x: number; y: number };
  closeMenuHandler: () => void;
}

export type ContextTag = {
  id: string;
  label: string;
};

export const ContextMenu = (props: ISelectMenuProps) => {
  const { onSelect, position, closeMenuHandler } = props;

  // const MENU_HEIGHT = 150;
  const items: ContextTag[] = [
    { id: 'copy', label: 'Copy' },
    { id: 'paste', label: 'Paste' },
  ];

  return (
    <div
      className={`${DP.dp02} absolute z-10 shadow-lg w-48 rounded-md py-1`}
      style={{ top: position.y, left: position.x }}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby=""
    >
      {/* <p className='text-white'>Command: {command}</p>/ */}
      <div className="Items">
        {items.map((item, key) => {
          return (
            <div
              className={`
              text-opacity-l-emp
              block text-white px-4 py-2 text-sm 
              hover:${DP.dp06} 
              hover:text-opacity-h-emp`}
              key={key}
              tabIndex={0}
              onClick={() => {
                console.log(item);
                return onSelect(item);
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};
