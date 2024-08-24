import React from 'react';
import moment from 'moment';
import { Div, MainDiv } from './style';

interface Props {
  title: string;
  time: Date;
}

export default function InternalMessageCard({ time, title }: Props) {
  return (
    <MainDiv>
      <Div>
        <p>
          <div dangerouslySetInnerHTML={{ __html: title }} />
        </p>
        <span>{moment(time).fromNow()}</span>
      </Div>
    </MainDiv>
  );
}
