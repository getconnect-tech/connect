import React from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import {
  LoadingFirstContainer,
  MainContainer,
  HeaderText,
  TopSection,
  HeadingTitle,
  HeaderSection,
  ValueTitle,
  ContentDiv,
  SpinnerDiv,
  Spinner,
} from './style';

function InsightsLoading() {
  return (
    <MainContainer>
      <LoadingFirstContainer>
        <HeaderText>Overview</HeaderText>
        <TopSection>
          <ContentDiv>
            <HeaderSection>
              <HeadingTitle>Queue size</HeadingTitle>
              <SVGIcon
                name='chart-tooltip-icon'
                width='12'
                height='12'
                viewBox='0 0 12 12'
              />
            </HeaderSection>
            <ValueTitle className='loading-animation' />
            <SpinnerDiv>
              <Spinner />
            </SpinnerDiv>
          </ContentDiv>
          <ContentDiv>
            <HeaderSection>
              <HeadingTitle>Median first response time</HeadingTitle>
              <SVGIcon
                name='chart-tooltip-icon'
                width='12'
                height='12'
                viewBox='0 0 12 12'
              />
            </HeaderSection>
            <ValueTitle className='loading-animation' />
            <SpinnerDiv>
              <Spinner />
            </SpinnerDiv>
          </ContentDiv>
          <ContentDiv>
            <HeaderSection>
              <HeadingTitle>Median resolution time</HeadingTitle>
              <SVGIcon
                name='chart-tooltip-icon'
                width='12'
                height='12'
                viewBox='0 0 12 12'
              />
            </HeaderSection>
            <ValueTitle className='loading-animation' />
            <SpinnerDiv>
              <Spinner />
            </SpinnerDiv>
          </ContentDiv>
        </TopSection>
      </LoadingFirstContainer>
      {/* Commented out this code as it may be needed for loading functionality in the future */}
      {/* <LoadingSecondContainer>
        <HeaderText>Support volume</HeaderText>
        <SecondTopSection>
          <ContentDiv>
            <HeaderSection>
              <HeadingTitle>Queue size</HeadingTitle>
              <SVGIcon
                name='chart-tooltip-icon'
                width='12'
                height='12'
                viewBox='0 0 12 12'
              />
            </HeaderSection>
            <ValueTitle className='loading-animation' />
            <SecondSpinnerDiv>
              <Spinner />
            </SecondSpinnerDiv>
          </ContentDiv>
        </SecondTopSection>
      </LoadingSecondContainer> */}
    </MainContainer>
  );
}

export default InsightsLoading;
