'use client';
import React, { useState } from 'react';
import {
  Dot,
  DotLine,
  EventDetailDiv,
  EventDiv,
  EventMainDiv,
  Line,
  LineDiv,
  Title,
  TitleDiv,
} from './styles';
import SVGIcon from '@/assets/icons/SVGIcon';

export default function RecentEvent() {
  const [showDetails, setShowDetails] = useState(true);

  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };
  return (
    <EventMainDiv>
      <TitleDiv onClick={toggleDetails}>
        <Title>Recent events</Title>
        <div className='icon'>
          <SVGIcon
            name={showDetails ? 'up-arrow-icon' : 'down-arrow-icon'}
            width='12'
            height='12'
            fill='none'
            viewBox='0 0 12 12'
          />
        </div>
      </TitleDiv>
      {showDetails && (
        <EventDetailDiv>
          <EventDiv>
            <h6>1h</h6>
            <DotLine>
              <Dot />
              <Line />
            </DotLine>
            <p>Message sent</p>
          </EventDiv>
          <LineDiv />
          <EventDiv>
            <h6>12h</h6>
            <DotLine>
              <Dot />
              <Line />
            </DotLine>
            <p>Comment added</p>
          </EventDiv>
          <LineDiv />
          <EventDiv>
            <h6>1d</h6>
            <DotLine>
              <Dot />
              <Line />
            </DotLine>
            <p>Ticket view</p>
          </EventDiv>
          <LineDiv />
          <EventDiv>
            <h6>1w</h6>
            <DotLine>
              <Dot />
              <Line />
            </DotLine>
            <p>Ticket deleted</p>
          </EventDiv>
        </EventDetailDiv>
      )}
    </EventMainDiv>
  );
}
