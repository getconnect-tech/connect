import styled, { keyframes } from 'styled-components';
import { Typography } from '@/styles/typography';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .loading-animation {
    overflow: hidden;
  }
  .loading-animation::before {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    animation: loading 1s infinite;
    background: linear-gradient(
      to right,
      transparent,
      var(--bg-surface-secondary-hover),
      transparent
    );
  }

  @keyframes loading {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const LoadingFirstContainer = styled.div`
  background-color: var(--white);
  padding: 16px;
  box-shadow: var(--shadow-card);
  border-radius: 12px;
  height: 292px;
`;

const LoadingSecondContainer = styled.div`
  background-color: var(--white);
  padding: 16px;
  box-shadow: var(--shadow-card);
  border-radius: 12px;
  height: 394px;
`;

const HeaderText = styled.p`
  ${Typography.heading_lg_regular};
  color: var(--text);
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(307px, 1fr));
  gap: 32px;
  padding-top: 24px;
  height: calc(100% - 24px);
`;

const ValueTitle = styled.div`
  width: 72px;
  height: 8px;
  border-radius: 30px;
  background-color: var(--bg-surface-secondary);
  margin: 8px 0;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
`;
const HeadingTitle = styled.p`
  ${Typography.body_md_medium}
  color: var(--text);
`;

const ContentDiv = styled.div`
  height: 100%;
`;

const SpinnerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 156px;
  margin-top: 8px;
`;

const SecondSpinnerDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 258px;
  margin-top: 8px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 2px solid var(--icon);
  border-top: 2px solid transparent;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
  margin: 16px auto 24px;
`;

const SecondTopSection = styled.div`
  padding-top: 24px;
`;

export {
  MainContainer,
  LoadingFirstContainer,
  LoadingSecondContainer,
  HeaderText,
  TopSection,
  ValueTitle,
  HeaderSection,
  HeadingTitle,
  ContentDiv,
  SpinnerDiv,
  Spinner,
  SecondTopSection,
  SecondSpinnerDiv,
};
