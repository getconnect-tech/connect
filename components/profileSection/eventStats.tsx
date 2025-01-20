import React, { useState } from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import {
  DetailsDiv,
  DetailsMainDiv,
  LeftDiv,
  NameDiv,
  Title,
  TitleDiv,
  WorkDetailMainDiv,
} from './styles';

function EventStats() {
  const [showDetails, setShowDetails] = useState(true);

  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  const eventInformation = [
    { name: 'Comment', value: 3 },
    { name: 'app loaded', value: 4 },
    { name: 'task: view', value: 10 },
    { name: 'account: signed in', value: 6 },
  ];

  return (
    <WorkDetailMainDiv>
      <TitleDiv onClick={toggleDetails}>
        <NameDiv>
          <Title>Events Stats</Title>
        </NameDiv>
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
        <DetailsMainDiv>
          {eventInformation.map((event, index) => (
            <DetailsDiv key={index}>
              <LeftDiv>
                <p>{event?.name}</p>
              </LeftDiv>
              <p>{event?.value}</p>
            </DetailsDiv>
          ))}
        </DetailsMainDiv>
      )}
    </WorkDetailMainDiv>
  );
}

export default EventStats;
