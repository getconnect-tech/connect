/* eslint-disable indent */
import styled from 'styled-components';

export const Header = styled.div`
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

export const TopHeader = styled.div`
  border-bottom: var(--border-main);
  padding: 7px 20px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Avtar = styled.div`
  width: 24px;
  height: 24px;
`;

export const Profile = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--bg-surface-secondary);
`;

export const Top = styled.div`
  width: 380px;
  height: 8px;
  border-radius: 6px;
  background-color: var(--bg-surface-secondary);
`;

export const BottomHeader = styled.div`
  padding: 9px 20px;
  border-bottom: var(--border-main);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left-side {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const Bottom = styled.div`
  width: 65px;
  height: 24px;
  border-radius: 30px;
  background-color: var(--bg-surface-secondary);
  &.center {
    width: 84px;
  }
  &.last {
    width: 95px;
  }
  &.center-right {
    width: 74px;
  }
  &.last-right {
    width: 85px;
  }
`;

export const CenterDiv = styled.div`
  max-width: 702px;
  margin: 0 auto;
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

export const ActivitySectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: calc(100vh - 82px);
`;

export const ActivityItemDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 90%;
  &.second-loading {
    opacity: 70%;
  }
  &.third-loading {
    opacity: 50%;
  }
`;

export const ActivityProfile = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--bg-surface-secondary);
`;

export const ActivityLeft = styled.div`
  width: 290px;
  height: 8px;
  border-radius: 6px;
  background-color: var(--bg-surface-secondary);
`;

export const DotIcon = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--bg-surface-secondary);
`;

export const ActivityRight = styled.div`
  width: 80px;
  height: 8px;
  border-radius: 6px;
  background-color: var(--bg-surface-secondary);
`;

export const LineDiv = styled.div`
  border-left: var(--border-main);
  height: 20px;
  margin-left: 10px;
`;

export const ActivityBottom = styled.div`
  width: 398px;
  height: 32px;
  border-radius: 6px;
  background-color: var(--bg-surface-secondary);
`;
