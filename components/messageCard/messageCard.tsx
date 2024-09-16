import React, { useState } from 'react';
import moment from 'moment';
import RenderHtml from '../renderHtml';
import DropDown from '../dropDown/dropDown';
import {
  CardHead,
  CardMessage,
  CardTop,
  MessageCardInnerDiv,
  MessageCardMainDiv,
  NameDiv,
  NameTitle,
  TagDiv,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';
import { ReadBy } from '@/utils/dataTypes';

interface Props {
  title: string;
  time: Date;
  subTitle: string;
  message: string;
  readBy?: ReadBy[];
}

export default function MessageCard({
  title,
  time,
  subTitle,
  message,
  readBy,
}: Props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const dropdownItems = readBy?.map((item: ReadBy) => ({
    name: item.name,
    duration: getDuration(item.seen_at),
  }));
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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Seen
              {isDropdownVisible && (
                <DropDown
                  items={dropdownItems}
                  iconSize={''}
                  iconViewBox={''}
                  onMouseLeave={handleMouseLeave} // Ensure dropdown also hides when mouse leaves the dropdown area
                  style={{ right: 12, maxWidth: 146, width: '100%' }}
                  isSeen={true}
                />
              )}
            </TagDiv>
          )}
        </CardTop>
        <CardMessage>
          <RenderHtml htmlstring={message} />
        </CardMessage>
      </MessageCardInnerDiv>
    </MessageCardMainDiv>
  );
}
