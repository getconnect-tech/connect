/* eslint-disable no-undef */
/* eslint-disable max-len */
import React, { useCallback, useState } from 'react';
import moment from 'moment';
import RenderHtml from '../renderHtml';
import DropDown from '../dropDown/dropDown';
import FileCard from '../fileCard/fileCard';
import {
  AttachmentMainDiv,
  CardHead,
  CardMessage,
  CardTop,
  DownloadButton,
  FileCardMainDiv,
  MessageCardInnerDiv,
  MessageCardMainDiv,
  NameDiv,
  NameTitle,
  TagDiv,
  Title,
  TitleDiv,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';
import { MessageAttachment, ReadBy } from '@/utils/dataTypes';

interface Props {
  title: string;
  time: Date;
  subTitle: string;
  message: string;
  readBy?: ReadBy[];
  attachments?: MessageAttachment[];
}

export default function MessageCard({
  title,
  time,
  subTitle,
  message,
  readBy,
  attachments = [],
}: Props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState<
    'upwards' | 'downwards'
  >('upwards');

  const getDuration = (lastSeen: Date) => {
    const lastSeenMoment = moment(lastSeen);
    const now = moment();
    const diffInMinutes = now.diff(lastSeenMoment, 'minutes');

    if (diffInMinutes < 60) {
      // If difference is less than 60 minutes, return in minutes
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      // If difference is less than 24 hours, return in hours
      const diffInHours = now.diff(lastSeenMoment, 'hours');
      return `${diffInHours}h`;
    } else {
      // If difference is more than or equal to 24 hours, return in days
      const diffInDays = now.diff(lastSeenMoment, 'days');
      return `${diffInDays}d`;
    }
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    // eslint-disable-next-line no-unused-vars
    setPosition: (position: 'upwards' | 'downwards') => void,
  ) => {
    const triggerElement = e.currentTarget;
    const rect = triggerElement.getBoundingClientRect();

    // Height of the sticky input (122px)
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

    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const dropdownItems = readBy?.map((item: ReadBy) => ({
    name: item.name,
    duration: getDuration(item.seen_at),
  }));

  const onClickDownloadAll = useCallback(() => {
    attachments.forEach((item) => {
      if (item?.downloadUrl) window.open(item?.downloadUrl, '_blank');
    });
  }, [attachments]);

  return (
    <MessageCardMainDiv>
      <MessageCardInnerDiv>
        <CardTop>
          <CardHead>
            <NameDiv>
              <NameTitle>{title}</NameTitle>
              <SVGIcon
                name='dot-icon'
                width='4'
                height='4'
                fill='none'
                viewBox='0 0 4 4'
              />
              <span>{moment(time).fromNow()}</span>
            </NameDiv>
            <p>{subTitle}</p>
          </CardHead>
          {dropdownItems && dropdownItems.length > 0 && (
            <TagDiv
              onMouseEnter={(e: any) => handleMouseEnter(e, setSubmenuPosition)}
              onMouseLeave={handleMouseLeave}
            >
              Seen
              {isDropdownVisible && (
                <DropDown
                  items={dropdownItems}
                  iconSize={''}
                  iconViewBox={''}
                  onMouseLeave={handleMouseLeave} // Ensure dropdown also hides when mouse leaves the dropdown area
                  style={{
                    right: 12,
                    maxWidth: 146,
                    width: '100%',
                    zIndex: 9999999,
                  }}
                  isSeen={true}
                  className={
                    submenuPosition === 'upwards'
                      ? 'submenu-upwards'
                      : 'submenu-downwards'
                  }
                />
              )}
            </TagDiv>
          )}
        </CardTop>
        <CardMessage>
          <RenderHtml htmlstring={message} />
        </CardMessage>
        {attachments?.length > 0 && (
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
                  type={attachment.contentType}
                />
              ))}
            </FileCardMainDiv>
          </AttachmentMainDiv>
        )}
      </MessageCardInnerDiv>
    </MessageCardMainDiv>
  );
}
