import React, { useCallback, useEffect, useState } from 'react';
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
  TopDiv,
} from './styles';
import SVGIcon from '@/assets/icons/SVGIcon';
import { ticketStore } from '@/stores/ticketStore';
import { isEmpty } from '@/helpers/common';
import { getTicketSummary } from '@/services/clientSide/ticketServices';

function AIBlock() {
  const [generateReply, setGenerateReply] = useState(false);
  const { ticketDetails, ticketSummary } = ticketStore;
  const [loading, setLoading] = useState(false);

  const onClickReplyButton = useCallback(() => {
    setGenerateReply(true);
  }, []);

  const onCloseReplyCard = useCallback(() => {
    setGenerateReply(false);
  }, []);

  const loadData = useCallback(async () => {
    if (ticketDetails && !isEmpty(ticketDetails?.id)) {
      setLoading(true);
      try {
        await getTicketSummary(ticketDetails?.id, true);
      } catch (error) {
        console.error('Error loading ticket summary:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [ticketDetails?.id]);

  useEffect(() => {
    loadData();
    return () => {
      ticketStore.setTicketSummary(null);
    };
  }, [loadData]);

  return (
    <>
      <TopDiv>
        <ProfileDiv>
          <AIIcon>
            <SVGIcon
              name='ai-icon'
              width='12'
              height='12'
              viewBox='0 0 12 12'
            />
          </AIIcon>
          <Title>Connect AI</Title>
        </ProfileDiv>
      </TopDiv>
      {loading ? (
        'Loading...'
      ) : (
        <DetailsProfileDiv>
          <DescriptionDiv>
            <AIText>{ticketSummary?.ticketSummary}</AIText>
            <AIText>{ticketSummary?.contactSentiment}</AIText>
          </DescriptionDiv>
          <DescriptionDiv className='action-div'>
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
            <DescriptionDiv className='action-div'>
              <h6>Generated replies</h6>
              <QuestionMainDiv>
                <ReplyCard onClick={onCloseReplyCard}>
                  Please let me know if there’s anything specific you’d like me
                  to prepare or review beforehand.
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
      )}
    </>
  );
}

export default AIBlock;
