import React, { useState } from 'react';
import {
  DetailsDiv,
  DetailsMainDiv,
  LeftDiv,
  Title,
  TitleDiv,
  WorkDetailMainDiv,
} from './styles';
import SVGIcon from '@/assets/icons/SVGIcon';

export default function WorkDetails() {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  return (
    <WorkDetailMainDiv>
      <TitleDiv>
        <Title>Workspace details</Title>
        <div onClick={toggleDetails}>
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
          <DetailsDiv>
            <LeftDiv>
              <p>Name</p>
            </LeftDiv>
            <p>Acme inc.</p>
          </DetailsDiv>
          <DetailsDiv>
            <LeftDiv>
              <p>ID</p>
            </LeftDiv>
            <p>w_12903424354</p>
          </DetailsDiv>
          <DetailsDiv>
            <LeftDiv>
              <p>Pricing plan</p>
            </LeftDiv>
            <p>Pro</p>
          </DetailsDiv>
          <DetailsDiv>
            <LeftDiv>
              <p>Project Usage</p>
            </LeftDiv>
            <p>21 of 25</p>
          </DetailsDiv>
          <DetailsDiv>
            <LeftDiv>
              <p>Pending request</p>
            </LeftDiv>
            <p>12</p>
          </DetailsDiv>
        </DetailsMainDiv>
      )}
    </WorkDetailMainDiv>
  );
}
