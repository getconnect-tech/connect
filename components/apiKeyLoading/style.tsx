import styled from 'styled-components';

const Main = styled.div`
  padding: 4px 0;
  background-color: var(--bg-white);
  box-shadow: var(--shadow-card);
  border-radius: 12px;
  margin-bottom: 16px;
  .second-block {
    opacity: 70%;
  }
  .third-block {
    opacity: 50%;
  }
  .fourth-block {
    opacity: 30%;
  }
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

const Firstblock = styled.div`
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  gap: 12px;
  z-index: 11111;
  opacity: 90%;
  border-bottom: var(--border-main);
  &:last-child {
    border-bottom: none;
  }
  .left-div {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

const Rightside = styled.div`
  display: flex;
  gap: 12px;
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Subdiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 6px;
  padding-bottom: 6px;
`;

const Top = styled.div`
  width: 141px;
  height: 8px;
  border-radius: 6px;
  background-color: var(--bg-surface-secondary);
  &.center {
    width: 95px;
    height: 12px;
  }
`;

const Leftside = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin: 4px;
  background-color: var(--bg-surface-secondary);
`;

export { Main, Firstblock, Rightside, Top, Subdiv, Leftside, TopDiv };
