import React from 'react';
import moment from 'moment';
import {
  AddReactionButton,
  Div,
  Emoji,
  IconDiv,
  MainDiv,
  ReactionCard,
  ReactionsMainDiv,
} from './style';
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
}

export default function InternalMessageCard({
  time,
  title,
  showReactions,
  reactions,
}: Props) {
  return (
    <div>
      <MainDiv>
        <Div>
          <p>
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </p>
          <span>{moment(time).fromNow()}</span>
        </Div>
        {!showReactions && (
          <IconDiv className='emoji-icon'>
            <SVGIcon
              name='emoji-icon'
              width='12'
              height='12'
              viewBox='0 0 12 12'
            />
          </IconDiv>
        )}
      </MainDiv>
      {showReactions && (
        <ReactionsMainDiv>
          {reactions.map((reaction, index) => (
            <ReactionCard key={index}>
              <Emoji>{reaction.emoji}</Emoji>
              <p>{reaction.count}</p>
            </ReactionCard>
          ))}
          <AddReactionButton>
            <SVGIcon
              name='emoji-icon'
              width='12'
              height='12'
              viewBox='0 0 12 12'
            />
          </AddReactionButton>
        </ReactionsMainDiv>
      )}
    </div>
  );
}
