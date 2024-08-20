/* eslint-disable max-len */
'use client';
import { useState } from 'react';
import {
  Description,
  EmailCardDiv,
  Head,
  LeftDiv,
  Main,
  MainDiv,
  RightDiv,
  Title,
} from '../style';
import { EmailChannelCard } from '@/components/emailChannelCard/emailChannelCard';

function Channel() {
  // Initialize the openCard state with 'Step1' to keep the first step open by default
  const [openCard, setOpenCard] = useState<string | null>('Step1');

  const handleSaveAndContinue = (currentStep: number) => {
    const nextStep = `Step${currentStep + 1}`;
    setOpenCard(nextStep);
  };

  return (
    <Main>
      <MainDiv>
        <RightDiv>
          <Head>
            <LeftDiv>
              <Title>Email</Title>
              <Description>
                Configure email channel to send and receive email in connect
              </Description>
            </LeftDiv>
          </Head>
          <EmailCardDiv>
            <EmailChannelCard
              stepName='Step1'
              stepContent='Your support Email Address'
              description='Choose the email address where you want customers to contact your company. Outgoing emails to customers will also be sent from this email address.'
              isOpen={openCard === 'Step1'}
              currentStep={1}
              onSaveAndContinue={() => handleSaveAndContinue(1)}
            />
            {openCard !== 'Step2' && openCard !== 'Step1' && (
              <div className='line-div' />
            )}
            <EmailChannelCard
              stepName='Step2'
              stepContent='Receiving emails'
              description='In order to receive emails in connect, you need to setup a forwarding address from hello@pixer.io to your workspace.'
              label='Forward inbound emails to this address:'
              isOpen={openCard === 'Step2'}
              currentStep={2}
              onSaveAndContinue={() => handleSaveAndContinue(2)}
            />
            {openCard !== 'Step2' && openCard !== 'Step3' && (
              <div className='line-div' />
            )}
            <EmailChannelCard
              stepName='Step3'
              stepContent='Sending emails'
              description='This step allows Connect to send emails on your behalf. Verifying your domain gives email clients confidence it was sent by Connect with your permission'
              label='Add the following records to the DNS settings for pixer.io.'
              isOpen={openCard === 'Step3'}
              currentStep={3}
              onSaveAndContinue={() => handleSaveAndContinue(3)}
            />
          </EmailCardDiv>
        </RightDiv>
      </MainDiv>
    </Main>
  );
}

export default Channel;
