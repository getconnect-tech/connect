import React from 'react';
import moment from 'moment';
import RenderHtml from '../renderHtml';
import {
  CardMessage,
  CardTop,
  MessageCardInnerDiv,
  MessageCardMainDiv,
  NameDiv,
  NameTitle,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';

interface Props {
  title: string;
  time: Date;
  subTitle: string;
  message: string;
}

export default function MessageCard({ title, time, subTitle, message }: Props) {
  return (
    <MessageCardMainDiv>
      <MessageCardInnerDiv>
        <CardTop>
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
        </CardTop>
        <CardMessage>
          <RenderHtml htmlstring={message} />
        </CardMessage>
      </MessageCardInnerDiv>
    </MessageCardMainDiv>
  );
}
