import React, { useCallback, useEffect, useRef, useState } from 'react';
import moment from 'moment';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'; // Import the EmojiPicker component
import FileCard from '../fileCard/fileCard';
import {
  AddReactionButton,
  AttachmentMainDiv,
  Div,
  DownloadButton,
  Emoji,
  EmojiPickerDiv,
  FileCardMainDiv,
  IconDiv,
  MainDiv,
  ReactionCard,
  ReactionsMainDiv,
  Title,
  TitleDiv,
} from './style';
import { MessageAttachment } from '@/utils/dataTypes';
import SVGIcon from '@/assets/icons/SVGIcon';

interface ReactionProps {
  emoji: string;
  count: number;
}
interface Props {
  title: string;
  time: Date;
  showReactions?: boolean;
  reactions: ReactionProps[];
  attachments?: MessageAttachment[];
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

export default function InternalMessageCard({
  time,
  title,
  showReactions,
  reactions,
  attachments = [],
}: Props) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to toggle emoji picker visibility
  const emojiPickerRef = useOutsideClick(() => setShowEmojiPicker(false)); // Create a ref for the EmojiPickerDiv
  const [selectedReactions, setSelectedReactions] =
    useState<ReactionProps[]>(reactions);
  const [submenuPosition, setSubmenuPosition] = useState<
    'upwards' | 'downwards'
  >('upwards');

  // Function to handle downloading all attachments
  const onClickDownloadAll = useCallback(() => {
    attachments.forEach((item) => {
      // eslint-disable-next-line no-undef
      if (item?.downloadUrl) window.open(item?.downloadUrl, '_blank');
    });
  }, [attachments]);

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

  const handleAddReactionClick = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    const newReactions = [
      ...selectedReactions,
      { emoji: emojiData.emoji, count: 1 },
    ];
    setSelectedReactions(newReactions);
    setShowEmojiPicker(false); // Close the emoji picker after selecting an emoji
  };

  return (
    <div>
      <MainDiv>
        <Div>
          <p>
            <div
              dangerouslySetInnerHTML={{ __html: title }}
              className='message'
            />
            {attachments && attachments?.length > 0 && (
              <AttachmentMainDiv>
                <TitleDiv>
                  <Title>{`${attachments?.length} Attachment${attachments?.length > 1 ? 's' : ''}`}</Title>
                  <DownloadButton onClick={onClickDownloadAll}>
                    Download All
                  </DownloadButton>
                </TitleDiv>
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
          </p>
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
          {selectedReactions.map((reaction, index) => (
            <ReactionCard key={index}>
              <Emoji>{reaction.emoji}</Emoji>
              <p>{reaction.count}</p>
            </ReactionCard>
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
}
