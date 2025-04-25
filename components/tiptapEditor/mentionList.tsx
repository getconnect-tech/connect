import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  Ref,
} from 'react';
import Avatar from '../avtar/Avtar';

// Define the interface for props
interface MentionListProps {
  items: any[];
  // eslint-disable-next-line no-unused-vars
  command: (item: { id: string; label: string; email: string }) => void;
}

// Define the type for the ref's imperative handle
export interface MentionListHandle {
  // eslint-disable-next-line no-unused-vars
  onKeyDown: (params: { event: KeyboardEvent }) => boolean;
}

// eslint-disable-next-line react/display-name
const MentionList = forwardRef<MentionListHandle, MentionListProps>(
  (props, ref: Ref<MentionListHandle>) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = props.items[index];
      if (item) {
        props.command({
          id: item?.id,
          label: item?.display_name,
          email: item?.email,
        });
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
      selectItem(selectedIndex);
    };

    useEffect(() => {
      setSelectedIndex(0);
    }, [props.items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
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

    return props.items?.length > 0 ? (
      <div className='dropdown-menu'>
        {props.items.length ? (
          props.items.map((item, index) => (
            <button
              className={index === selectedIndex ? 'is-selected' : ''}
              key={item?.id}
              onClick={() => selectItem(index)}
            >
              <Avatar
                imgSrc={item?.profile_url || ''}
                name={item?.display_name ? item?.display_name : 'U N'}
                size={20}
                classname='avtar'
              />
              {item?.display_name}
            </button>
          ))
        ) : (
          <div className='item'>No result</div>
        )}
      </div>
    ) : (
      <></>
    );
  },
);

export default MentionList;
