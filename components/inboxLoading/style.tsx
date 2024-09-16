import styled from 'styled-components';

const Main = styled.div`
  max-width: 662px;
  width: 100%;
  margin: 12px auto 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  padding: 12px 21px;
  background-color: var(--bg-white);
  border-radius: 12px;
  box-shadow: var(--shadow-card);
  display: flex;
  justify-content: space-between;
  position: relative;
  gap: 12px;
  z-index: 11111;
  opacity: 90%;
`;

const Avtar = styled.div`
  width: 28px;
  height: 28px;
`;

const Profile = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--bg-surface-secondary);
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

const BottomDiv = styled.div`
  display: flex;
  gap: 8px;
`;

const DotIcon = styled.div`
  width: 5px;
  height: 5px;
  position: absolute;
  border-radius: 50%;
  left: 12px;
  top: 22px;
  background-color: var(--bg-surface-secondary);
`;

const Subdiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 6px;
  padding-bottom: 6px;
`;

const Top = styled.div`
  width: 177px;
  height: 8px;
  border-radius: 6px;
  background-color: var(--bg-surface-secondary);
  &.center {
    width: 333px;
    height: 12px;
  }
  &.bottom {
    width: 417px;
    height: 8px;
  }
`;

const Bottom = styled.div`
  width: 65px;
  height: 24px;
  border-radius: 30px;
  background-color: var(--bg-surface-secondary);
  &.first {
    width: 99px;
  }
  &.second {
    width: 90px;
  }
`;
const Leftside = styled.div`
  width: 66px;
  height: 8px;
  border-radius: 30px;
  background-color: var(--bg-surface-secondary);
`;

export {
  Main,
  Firstblock,
  Profile,
  Rightside,
  Top,
  Bottom,
  Subdiv,
  Leftside,
  Avtar,
  BottomDiv,
  TopDiv,
  DotIcon,
};
