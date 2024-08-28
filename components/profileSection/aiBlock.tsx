import React, { useCallback, useState } from 'react';
import {
  Actions,
  ActionsDiv,
  AIIcon,
  AIText,
  DescriptionDiv,
  DetailsProfileDiv,
  ProfileDiv,
  QuestionMainDiv,
  ReplyButton,
  ReplyCard,
  Title,
} from './styles';
import SVGIcon from '@/assets/icons/SVGIcon';

function AIBlock() {
  const [generateReply, setGenerateReply] = useState(false);

  const onClickReplyButton = useCallback(() => {
    setGenerateReply(true);
  }, []);

  const onCloseReplyCard = useCallback(() => {
    setGenerateReply(false);
  }, []);

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
            <ReplyButton onClick={onClickReplyButton}>
              Generate Reply
            </ReplyButton>
          </ActionsDiv>
        </DescriptionDiv>
        {generateReply && (
          <DescriptionDiv>
            <h6>Generated replies</h6>
            <QuestionMainDiv>
              <ReplyCard onClick={onCloseReplyCard}>
                Please let me know if there’s anything specific you’d like me to
                prepare or review beforehand.
              </ReplyCard>
              <ReplyCard onClick={onCloseReplyCard}>
                We have received your application.
              </ReplyCard>
              <ReplyCard onClick={onCloseReplyCard}>
                Looking forward to collaborating with you again in the future.
              </ReplyCard>
            </QuestionMainDiv>
          </DescriptionDiv>
        )}
      </DetailsProfileDiv>
    </>
  );
}

export default AIBlock;
