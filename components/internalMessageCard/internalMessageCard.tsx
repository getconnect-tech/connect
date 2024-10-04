import React, { useCallback, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { observer } from 'mobx-react-lite';
import FileCard from '../fileCard/fileCard';
import DropDown from '../dropDown/dropDown';
import RenderHtml from '../renderHtml';
import Avatar from '../avtar/Avtar';
import {
  AddReactionButton,
  AttachmentMainDiv,
  Div,
  Emoji,
  EmojiPickerDiv,
  FileCardMainDiv,
  IconDiv,
  Main,
  MainDiv,
  Name,
  NameMainDiv,
  ReactionCard,
  ReactionsMainDiv,
} from './style';
import { MessageAttachment } from '@/utils/dataTypes';
import SVGIcon from '@/assets/icons/SVGIcon';
import { userStore } from '@/stores/userStore';
import { ReactionProps } from '@/utils/appTypes';
import { reactMessage } from '@/services/clientSide/ticketServices';
import { ticketStore } from '@/stores/ticketStore';

interface Props {
  title: string;
  time: Date;
  showReactions?: boolean;
  reactions: ReactionProps[];
  attachments?: MessageAttachment[];
  messageId: string;
  message: any;
  messageName: any;
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
  messageId,
  message,
  messageName,
}: Props) => {
  const { user } = userStore;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showResponsiveEmojiPicker, setShowResponsiveEmojiPicker] =
    useState(false);
  const emojiPickerRef = useOutsideClick(() => setShowEmojiPicker(false));
  const emojiResponsivePickerRef = useOutsideClick(() =>
    setShowResponsiveEmojiPicker(false),
  );
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

  const handleResponsiveAddReactionClick = () => {
    setShowResponsiveEmojiPicker((prev) => !prev);
  };

  const handleEmojiSelect = useCallback(
    async (emojiData: EmojiClickData) => {
      const selectedEmoji = emojiData.emoji;

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
        ticketStore.addReactionInMessage(
          messageId,
          'deleted',
          selectedEmoji,
          user?.id || '',
          user?.display_name || '',
        );
      }

      if (reactionIndex !== -1) {
        // If the selected emoji exists, update the existing reaction
        const existingReaction = newReactions[reactionIndex];
        const userAlreadyReacted = existingReaction?.author.some(
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
          ticketStore.addReactionInMessage(
            messageId,
            'deleted',
            selectedEmoji,
            user?.id || '',
            user?.display_name || '',
          );
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
          ticketStore.addReactionInMessage(
            messageId,
            'created',
            selectedEmoji,
            user?.id || '',
            user?.display_name || '',
          );
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
        ticketStore.addReactionInMessage(
          messageId,
          'created',
          selectedEmoji,
          user?.id || '',
          user?.display_name || '',
        );
      }

      // Set the updated reactions
      setSelectedReactions(newReactions);
      setShowEmojiPicker(false);
      setHoveredIndex(null);

      // API call
      try {
        const payload = {
          reaction: selectedEmoji,
        };
        await reactMessage(messageId, payload);
      } catch (e) {
        console.log('Error : ', e);
      }
    },
    [selectedReactions],
  );

  const dropdownItem = useCallback(
    (index: number) => {
      return selectedReactions[index]?.author.map((member) => {
        return { name: member.display_name, isName: true };
      });
    },
    [selectedReactions],
  );

  return (
    <Main>
      <MainDiv>
        <Div>
          <div className='message'>
            <NameMainDiv>
              <div className='left-div'>
                <Avatar imgSrc={message} name={messageName} size={20} />
                <Name>{messageName}</Name>
                <SVGIcon
                  name='dot-icon'
                  width='4'
                  height='4'
                  fill='none'
                  viewBox='0 0 4 4'
                />
                <p>{moment(time).fromNow()}</p>
              </div>
              {!showReactions && (
                <EmojiPickerDiv ref={emojiResponsivePickerRef}>
                  <div
                    onClick={handleResponsiveAddReactionClick}
                    onMouseEnter={(e) =>
                      handleMouseEnter(e, setSubmenuPosition)
                    }
                  >
                    <SVGIcon
                      name='emoji-icon'
                      width='12'
                      height='12'
                      viewBox='0 0 12 12'
                      className='icon'
                    />
                  </div>
                  {showResponsiveEmojiPicker && (
                    <div className='reaction-icon-div'>
                      <EmojiPicker
                        onEmojiClick={handleEmojiSelect}
                        className={
                          submenuPosition === 'upwards'
                            ? 'submenu-upwards responsive-upwards'
                            : 'submenu-downwards responsive'
                        }
                      />
                    </div>
                  )}
                </EmojiPickerDiv>
              )}
            </NameMainDiv>
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
                      type={attachment.contentType}
                    />
                  ))}
                </FileCardMainDiv>
              </AttachmentMainDiv>
            )}
          </div>
          <span className='time'>{moment(time).fromNow()}</span>
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
              style={{ position: 'relative' }}
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
    </Main>
  );
};

export default observer(InternalMessageCard);
