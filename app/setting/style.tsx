/* eslint-disable indent */
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import styled, { css } from 'styled-components';
import { Typography } from '@/styles/typography';

interface Props {
  isNavbar?: boolean;
}

export const Main = styled.div<Props>`
  display: flex;
  background-color: var(--bg-surface);
  width: 100%;
  margin-left: 254px;
  @media screen and (max-width: 449px) {
    margin-left: unset;
  }
`;

export const MainDiv = styled.div`
  width: 100%;
`;

export const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 662px;
  width: 100%;
  gap: 6px;
  .empty-state {
    position: absolute;
    bottom: 20%;
    left: 53%;
  }
  @media screen and (max-width: 449px) {
    gap: 0;
  }
`;

export const ResponsiveHeader = styled.div`
  display: none;
  @media screen and (max-width: 449px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    position: sticky;
    top: 0;
    background-color: var(--bg-surface);
    z-index: 11;
    border-bottom: var(--border-main);
    .left-section {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
`;

export const NavbarTitle = styled.div`
  ${Typography.body_md_medium};
  color: var(--text);
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: var(--bg-surface);
  z-index: 2;
  margin: 0 -4px;
  padding: 50px 5px 10px;
  .left-main-div {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .sidebar-icon {
    display: none;
    @media screen and (max-width: 449px) {
      display: flex;
    }
  }
  @media screen and (max-width: 449px) {
    padding: 16px 16px 0;
    margin: unset;
    top: 53px;
  }
`;

export const Description = styled.div`
  ${Typography.body_md_regular}
  color: var(--text-text-secondary);
`;

export const Title = styled.div`
  ${Typography.heading_lg_regular}
  color: var(--text);
`;

export const ProfileDetail = styled.form<Props>`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 16px;
  gap: 16px;
  background-color: var(--bg-white);
  box-shadow: var(--shadow-card);
  @media screen and (max-width: 449px) {
    margin: 16px;
    ${(props) =>
      props.isNavbar &&
      css`
        min-width: 361px;
      `}
  }
`;

export const ProfileImage = styled.div`
  display: flex;
  gap: 12px;
`;

export const Frame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  p {
    ${Typography.body_md_regular};
    color: var(--text-text-secondary);
  }
`;

export const Link = styled.a`
  padding: 4px 0;
  ${Typography.body_md_medium};
  color: var(--text-link);
  cursor: pointer;
`;

export const ProfileInputs = styled.div`
  display: flex;
  gap: 12px;
`;

export const TextField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 260px;
  width: 100%;
  @media screen and (max-width: 449px) {
    max-width: unset;
  }
`;

export const Label = styled.div`
  ${Typography.body_md_medium}
  color: var(--text);
`;

export const PasswordInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const checkmarkSVG = `
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.20006 8.67037C3.19946 8.67037 3.19886 8.67037 3.19766 8.67037C3.03746 8.66977 2.88506 8.60559 2.77286 8.49159L0.372863 6.05438C0.140063 5.81798 0.143064 5.43818 0.379464 5.20598C0.615864 4.97378 0.99506 4.97617 1.22786 5.21257L3.20366 7.21897L8.77647 1.64678C9.01107 1.41218 9.39026 1.41218 9.62486 1.64678C9.85946 1.88078 9.85946 2.26118 9.62486 2.49518L3.62486 8.49518C3.51206 8.60738 3.35906 8.67037 3.20006 8.67037Z" fill="white"/>
  </svg>
`;

export const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: var(--bg-white);
  border: var(--border-secondary);
  border-radius: 4px;
  display: inline-block;
  position: relative;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: var(--brand);
    background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(checkmarkSVG)}');
    background-size: 10px 10px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const NotificationCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 0 16px;
  background-color: var(--bg-white);
  box-shadow: var(--shadow-card);
  padding: 0 16px;
`;

export const NotificationItem = styled.div`
  display: flex;
  border-bottom: var(--border-light);
  padding: 12px 0;
  gap: 10px;
  align-items: center;
  p {
    ${Typography.body_md_medium};
    color: var(--text-link);
  }
`;

export const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MainCardDiv = styled.div`
  padding: 4px 0;
  background-color: var(--bg-white);
  box-shadow: var(--shadow-card);
  border-radius: 12px;
  margin-bottom: 16px;
`;
export const EmailCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-surface-secondary);
  border-radius: 12px;
  .line-div {
    height: 0.4px;
    margin: 0 16px;
    background: var(--border-hover);
  }
`;

export const EmptyStateDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
`;
