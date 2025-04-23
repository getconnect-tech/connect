/* eslint-disable max-len */
'use client';
import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import SVGIcon from '@/assets/icons/SVGIcon';
import { Heading, MainDiv, OnBoardScreen, Frame, Title } from './style';
import CompanyInfoStep from './CompanyInfoStep';
import TimezoneStep from './TimezoneStep';
import TeamInviteStep from './TeamInviteStep';

function OnboardingStep1() {
  // State variable to track the current step of the onboarding process
  const [currentStep, setCurrentStep] = useState(1);

  // Render the appropriate step content based on currentStep
  const renderStepContent = useCallback(() => {
    switch (currentStep) {
      case 1:
        return <CompanyInfoStep setCurrentStep={setCurrentStep} />;
      case 2:
        return <TimezoneStep setCurrentStep={setCurrentStep} />;
      case 3:
        return <TeamInviteStep />;
      default:
        return <CompanyInfoStep setCurrentStep={setCurrentStep} />;
    }
  }, [currentStep]);

  return (
    <MainDiv>
      <OnBoardScreen isNext={currentStep === 3}>
        <Heading>
          <SVGIcon
            name='logo-icon'
            width='60px'
            height='60px'
            viewBox='0 0 20 20'
          />
          <Title isNext={currentStep === 3}>
            Just a few quick things to set up your account
          </Title>
        </Heading>
        <Frame>{renderStepContent()}</Frame>
      </OnBoardScreen>
    </MainDiv>
  );
}

export default observer(OnboardingStep1);
