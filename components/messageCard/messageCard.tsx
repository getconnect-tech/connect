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

interface Props {
  title: string;
  time: Date;
  subTitle: string;
  message: string;
}

export default function MessageCard({ title, time, subTitle, message }: Props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };

  const dropdownItems = [
    { name: 'Mohit', duration: '2d' },
    { name: 'Aniket', duration: '2d' },
    { name: 'Pinal', duration: '16h' },
  ];
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
                onChange={(item) => console.log('Item changed:', item)}
              />
            )}
          </TagDiv>
        </CardTop>
        <CardMessage>
          <RenderHtml htmlstring={message} />
        </CardMessage>
      </MessageCardInnerDiv>
    </MessageCardMainDiv>
  );
}
