import React from 'react';
import {
  Actions,
  ActionsDiv,
  AIIcon,
  AIText,
  DescriptionDiv,
  DetailsProfileDiv,
  ProfileDiv,
  Title,
} from './styles';
import SVGIcon from '@/assets/icons/SVGIcon';

function AIBlock() {
  return (
    <>
      <ProfileDiv>
        <AIIcon>
          <SVGIcon name='ai-icon' width='12' height='12' viewBox='0 0 12 12' />
        </AIIcon>
        <Title>Connect AI</Title>
      </ProfileDiv>
      <DetailsProfileDiv>
        <DescriptionDiv>
          <AIText>
            Sanjay has issues related to Payment in Invoicing module
          </AIText>
          <AIText>Sanjay’s sentiment is slightly sad 😔</AIText>
        </DescriptionDiv>
        <DescriptionDiv>
          <h6>Suggested Action</h6>
          <ActionsDiv>
            <Actions>
              Assign To <span>Sanjay</span>
            </Actions>
            <Actions>
              Add <span>Bug</span> Label
            </Actions>
            <Actions>
              Set <span>Medium</span> Priority
            </Actions>
            <Actions>Generate Reply</Actions>
          </ActionsDiv>
        </DescriptionDiv>
      </DetailsProfileDiv>
    </>
  );
}

export default AIBlock;
