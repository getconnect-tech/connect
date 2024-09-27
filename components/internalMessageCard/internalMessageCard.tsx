import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { observer } from 'mobx-react-lite';
import FileCard from '../fileCard/fileCard';
import DropDown from '../dropDown/dropDown';
import RenderHtml from '../renderHtml';
import {
  AddReactionButton,
  AttachmentMainDiv,
  Div,
  Emoji,
  EmojiPickerDiv,
  FileCardMainDiv,
  IconDiv,
  MainDiv,
  ReactionCard,
  ReactionsMainDiv,
} from './style';
import { MessageAttachment } from '@/utils/dataTypes';
import SVGIcon from '@/assets/icons/SVGIcon';
import { userStore } from '@/stores/userStore';
import { ReactionProps } from '@/utils/appTypes';

interface Props {
  title: string;
  time: Date;
  showReactions?: boolean;
  reactions: ReactionProps[];
  attachments?: MessageAttachment[];
  // eslint-disable-next-line no-unused-vars
  addReactionToMessage: (emoji: string) => void;
}

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (target.closest(`.tag-div`)) {
          return;
        }
        callback();
      }
    };

    // eslint-disable-next-line no-undef
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // eslint-disable-next-line no-undef
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};

const InternalMessageCard = ({
  time,
  title,
  showReactions,
  reactions,
  attachments = [],
  addReactionToMessage,
}: Props) => {
  const { user } = userStore;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useOutsideClick(() => setShowEmojiPicker(false));
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedReactions, setSelectedReactions] =
    useState<ReactionProps[]>(reactions);
  const [submenuPosition, setSubmenuPosition] = useState<
    'upwards' | 'downwards'
  >('upwards');

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    // eslint-disable-next-line no-unused-vars
    setPosition: (position: 'upwards' | 'downwards') => void,
  ) => {
    const triggerElement = e.currentTarget;
    const rect = triggerElement.getBoundingClientRect();

    // Sticky input height or any other elements affecting the dropdown position
    const stickyInputHeight = 122;

    // Available space above and below the trigger element
    // eslint-disable-next-line no-undef
    const spaceBelow = window.innerHeight - rect.bottom - stickyInputHeight;
    const spaceAbove = rect.top;

    // Adjust dropdown position based on available space
    if (spaceBelow < 200 && spaceAbove > 200) {
      // Set dropdown to appear upwards
      setPosition('upwards');
    } else {
      // Set dropdown to appear downwards
      setPosition('downwards');
    }
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const handleAddReactionClick = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    const selectedEmoji = emojiData.emoji;
    // API call
    addReactionToMessage(selectedEmoji);

    // Check if the reaction already exists for the selected emoji
    const reactionIndex = selectedReactions.findIndex(
      (reaction) => reaction.emoji === selectedEmoji,
    );

    let newReactions = [...selectedReactions]; // Copy of selected reactions

    // Check if the user has any existing reaction
    const existingReactionIndex = newReactions.findIndex((reaction) =>
      reaction.author.some((author) => author.id === user?.id),
    );

    // If the user already reacted with a different emoji
    if (
      existingReactionIndex !== -1 &&
      newReactions[existingReactionIndex].emoji !== selectedEmoji
    ) {
      // Decrease count of the previous reaction and remove the user from authors
      const previousReaction = newReactions[existingReactionIndex];
      const updatedAuthors = previousReaction.author.filter(
        (author) => author.id !== user?.id,
      );

      // Update the previous reaction
      if (updatedAuthors.length === 0) {
        // If no authors left, remove the whole previous reaction
        newReactions = newReactions.filter(
          (_, index) => index !== existingReactionIndex,
        );
      } else {
        // Otherwise, decrement the count and update the authors list
        newReactions[existingReactionIndex] = {
          ...previousReaction,
          count: updatedAuthors.length,
          author: updatedAuthors,
        };
      }
    }

    if (reactionIndex !== -1) {
      // If the selected emoji exists, update the existing reaction
      const existingReaction = newReactions[reactionIndex];
      const userAlreadyReacted = existingReaction.author.some(
        (author) => author.id === user?.id,
      );

      if (userAlreadyReacted) {
        // If the user already reacted with this emoji, remove them from the authors
        const updatedAuthors = existingReaction.author.filter(
          (author) => author.id !== user?.id,
        );

        if (updatedAuthors.length === 0) {
          // If no authors left, remove the whole reaction
          newReactions = newReactions.filter(
            (_, index) => index !== reactionIndex,
          );
        } else {
          // Otherwise, decrement the count and update the authors list
          newReactions[reactionIndex] = {
            ...existingReaction,
            count: updatedAuthors.length,
            author: updatedAuthors,
          };
        }
      } else {
        // If the user hasn't reacted with this emoji, add them to the author list and increment count
        newReactions[reactionIndex] = {
          ...existingReaction,
          count: existingReaction.count + 1,
          author: [
            ...existingReaction.author,
            { id: user?.id || '', display_name: user?.display_name || null },
          ],
        };
      }
    } else {
      // If the selected emoji doesn't exist in the reactions, add a new reaction
      newReactions.push({
        emoji: selectedEmoji,
        count: 1,
        author: [
          { id: user?.id || '', display_name: user?.display_name || null },
        ],
      });
    }

    // Set the updated reactions
    setSelectedReactions(newReactions);
    setShowEmojiPicker(false);
  };

  const dropdownItem = (index: number) => {
    return selectedReactions[index]?.author.map((member) => {
      return { name: member.display_name, isName: true };
    });
  };

  return (
    <div>
      <MainDiv>
        <Div>
          <div className='message'>
            <RenderHtml htmlstring={title} />
            {attachments && attachments?.length > 0 && (
              <AttachmentMainDiv>
                <FileCardMainDiv>
                  {attachments?.map((attachment, index) => (
                    <FileCard
                      key={index}
                      documentText={attachment.fileName}
                      fileSize={attachment.size}
                      fileName={attachment.fileName}
                      url={attachment.downloadUrl}
                    />
                  ))}
                </FileCardMainDiv>
              </AttachmentMainDiv>
            )}
          </div>
          <span>{moment(time).fromNow()}</span>
        </Div>
        {!showReactions && (
          <EmojiPickerDiv ref={emojiPickerRef}>
            <IconDiv
              className='emoji-icon'
              onClick={handleAddReactionClick}
              onMouseEnter={(e) => handleMouseEnter(e, setSubmenuPosition)}
            >
              <SVGIcon
                name='emoji-icon'
                width='12'
                height='12'
                viewBox='0 0 12 12'
              />
            </IconDiv>
            {showEmojiPicker && (
              <div className='reaction-icon-div'>
                <EmojiPicker
                  onEmojiClick={handleEmojiSelect}
                  className={
                    submenuPosition === 'upwards'
                      ? 'submenu-upwards'
                      : 'submenu-downwards'
                  }
                />
              </div>
            )}
          </EmojiPickerDiv>
        )}
      </MainDiv>
      {showReactions && (
        <ReactionsMainDiv>
          {selectedReactions?.map((reaction, index) => (
            <div
              key={index}
              onMouseEnter={(e) => {
                handleMouseEnter(e, setSubmenuPosition);
                setHoveredIndex(index); // Set the hovered index
                setIsDropdownVisible(true);
              }}
              onMouseLeave={() => {
                handleMouseLeave();
                setHoveredIndex(null); // Clear the hovered index
                setIsDropdownVisible(false);
              }}
            >
              <ReactionCard>
                <Emoji>{reaction.emoji}</Emoji>
                <p>{reaction.count}</p>
              </ReactionCard>
              {isDropdownVisible && hoveredIndex === index && (
                <DropDown
                  items={dropdownItem(index)}
                  iconSize={''}
                  iconViewBox={''}
                  onMouseLeave={handleMouseLeave}
                  className={
                    submenuPosition === 'upwards'
                      ? 'submenu-upwards'
                      : 'submenu-downwards'
                  }
                />
              )}
            </div>
          ))}
          <EmojiPickerDiv ref={emojiPickerRef}>
            <AddReactionButton
              onClick={handleAddReactionClick}
              onMouseEnter={(e) => handleMouseEnter(e, setSubmenuPosition)}
            >
              <SVGIcon
                name='emoji-icon'
                width='12'
                height='12'
                viewBox='0 0 12 12'
              />
            </AddReactionButton>
            {showEmojiPicker && (
              <div className='reaction-button-div'>
                <EmojiPicker
                  onEmojiClick={handleEmojiSelect}
                  className={
                    submenuPosition === 'upwards'
                      ? 'submenu-upwards'
                      : 'submenu-downwards'
                  }
                />
              </div>
            )}
          </EmojiPickerDiv>
        </ReactionsMainDiv>
      )}
    </div>
  );
};

export default observer(InternalMessageCard);
