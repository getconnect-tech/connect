import React from 'react';
import moment from 'moment';
import { Div, MainDiv } from './style';

interface Props {
  title: string;
  time: Date;
}

export default function QuestionCard({ time, title }: Props) {
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
