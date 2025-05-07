import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import { SlashCommandDiv, SlashCommandItem } from './style';

type CommandItem = {
  title: string;
  iconName: string;
  // eslint-disable-next-line no-unused-vars
  command: (item: CommandItem) => void;
};

type CommandsListProps = {
  items: CommandItem[];
  // eslint-disable-next-line no-unused-vars
  command: (item: CommandItem) => void;
};

export type CommandsListHandle = {
  // eslint-disable-next-line no-unused-vars
  onKeyDown: (event: React.KeyboardEvent) => boolean;
};

// eslint-disable-next-line react/display-name
const CommandsList = forwardRef<CommandsListHandle, CommandsListProps>(
  ({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex(
          (prevIndex) => (prevIndex - 1 + items.length) % items.length,
        );
        return true;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prevIndex) => (prevIndex + 1) % items.length);
        return true;
      }

      if (event.key === 'Enter') {
        event.preventDefault();
        selectItem(selectedIndex);
        return true;
      }

      if (event.key === 'Escape') {
        return true;
      }

      return false;
    };

    const selectItem = (index: number) => {
      const item = items[index];
      if (item) {
        command(item);
      }
    };

    useImperativeHandle(ref, () => ({ onKeyDown: handleKeyDown }));

    return (
      <SlashCommandDiv
        tabIndex={0} // Allows the div to receive focus for keyboard events
      >
        {items.length > 0 ? (
          items.map((item, index) => (
            <SlashCommandItem
              key={item?.title}
              className={`item ${index === selectedIndex ? 'is-selected' : ''}`}
              onClick={() => selectItem(index)}
            >
              <SVGIcon
                name={item.iconName}
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill={
                  index === selectedIndex ? 'var(--icon-hover)' : 'var(--icon)'
                }
              />
              {item.title}
            </SlashCommandItem>
          ))
        ) : (
          <SlashCommandItem>No result</SlashCommandItem>
        )}
      </SlashCommandDiv>
    );
  },
);

export default CommandsList;
