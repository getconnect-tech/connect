import styled from 'styled-components';

const MainDiv = styled.div`
  margin: 12px auto 0;
  border-radius: 12px;
  padding: 4px 0;
  background-color: var(--bg-white);
  box-shadow: var(--shadow-card);
  @media screen and (max-width: 449px) {
    padding: 0;
  }
`;

const MainCardDiv = styled.div`
  display: flex;
  padding: 10px 12px;
  opacity: 90%;
  border-bottom: var(--border-light);
  align-items: center;
  justify-content: space-between;

  &:last-child {
    border-bottom: none;
  }
  &.second-card {
    opacity: 70%;
  }
  &.third-card {
    opacity: 50%;
  }
  &.fourth-card {
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
  @media screen and (max-width: 449px) {
    padding: 8px 12px;
    flex-direction: column;
    align-items: flex-start;
  }
`;
const CardDetail = styled.div`
  display: flex;
  gap: 12px;
`;
const AvtarDiv = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 30px;
  background-color: var(--bg-surface-secondary);
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const NameDiv = styled.div`
  width: 108px;
  height: 12px;
  margin: 4px 0;
  border-radius: 30px;
  background-color: var(--bg-surface-secondary);
`;

const CompanyNameDiv = styled.div`
  margin: 4px 0;
  width: 198px;
  height: 8px;
  border-radius: 30px;
  background-color: var(--bg-surface-secondary);
`;

const TicketCountDiv = styled.div`
  width: 109px;
  height: 8px;
  border-radius: 30px;
  background-color: var(--bg-surface-secondary);
  @media screen and (max-width: 449px) {
    margin-left: 40px;
    margin-top: 10px;
  }
`;
export {
  MainDiv,
  MainCardDiv,
  CardDetail,
  AvtarDiv,
  ContentDiv,
  NameDiv,
  CompanyNameDiv,
  TicketCountDiv,
};
