/* eslint-disable indent */
import styled, { css } from 'styled-components';
import { Typography } from '@/styles/typography';

interface Props {
  isActive?: boolean;
}

const MainDiv = styled.div`
  padding: 20px 16px;
  height: 100vh;
  background-color: var(--bg-surface);
  width: 223px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: var(--border-main);
  position: fixed;
  @media screen and (max-width: 449px) {
    display: none;
  }
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  .cross-icon {
    display: none;
    @media screen and (max-width: 449px) {
      display: flex;
    }
  }
`;

const OrganizationNameDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
  p {
    ${Typography.body_md_medium}
    color: var(--text);
    margin: 0;
    margin-right: 8px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  &:hover {
    cursor: pointer;
    background-color: var(--bg-surface-hover);
    border-radius: 30px;
  }
  @media screen and (max-width: 449px) {
    padding: 0;
  }
`;

const ItemMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const ItemDiv = styled.div<Props>`
  display: flex;
  align-items: center;
  padding: 4px 4px 4px 12px;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background-color: var(--bg-surface-hover);
    border-radius: 30px;
  }
  ${(props) =>
    props.isActive &&
    css`
      background-color: var(--bg-surface-active);
      border-radius: 30px;
    `}
`;

const Title = styled.p<Props>`
  margin: 0;
  ${Typography.body_md_regular}
  color: var(${({ isActive }) =>
    isActive ? '--text' : '--text-text-secondary'});
`;

const Label = styled.p`
  ${Typography.body_sm_medium}
  color: var(--text-text-secondary);
  padding: 0 12px;
`;

const CountText = styled.p`
  ${Typography.body_sm_regular}
  color: var(--text-text-secondary);
  background-color: var(--bg-surface-secondary);
  padding: 2px 8px;
  border-radius: 50%;
`;

const LeftDiv = styled.div<Props>`
  display: flex;
  align-items: center;
  gap: 8px;
  svg {
    fill: var(--icon);
    ${(props) =>
      props.isActive &&
      css`
        fill: var(--icon-hover);
      `}
  }
`;
const ProfileDrop = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: 4px;
  max-width: 191px;
  width: 100%;
  border-radius: 12px;
  background-color: var(--bg-white);
  box-shadow: var(--shadow-dropdown);
  @media screen and (max-width: 449px) {
    max-width: 228px;
  }
`;
const Frame1 = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  border-bottom: var(--border-light);
`;
const Frame2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px;
`;
const OrganizationProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 8px;
  p {
    ${Typography.body_md_medium};
    color: var(--text-text-secondary);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  &:hover {
    cursor: pointer;
    background-color: var(--bg-white-hover);
    border-radius: 8px;
    p {
      color: var(--text);
    }
  }
`;
const Description = styled.div`
  ${Typography.body_sm_regular};
  color: var(--text-text-secondary);
`;
const ProfileItemDiv = styled.div`
  display: flex;
  padding: 4px 8px;
  gap: 8px;
  align-items: center;
  fill: var(--icon);
  p {
    ${Typography.body_md_regular}
    color: var(--text-text-secondary);
  }
  &:hover {
    fill: var(--icon-hover);
    cursor: pointer;
    background-color: var(--bg-white-hover);
    border-radius: 8px;
    p {
      color: var(--text);
    }
  }
`;

const ResponsiveMainDiv = styled.div`
  max-width: 260px;
  min-width: 260px;
  width: 100%;
  padding: 16px;
  border-right: var(--border-main);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .support-dropdown {
    bottom: 52px;
    max-width: 228px;
    width: 100%;
  }
  @media screen and (min-width: 450px) {
    display: none;
  }
`;

export {
  MainDiv,
  LogoDiv,
  ItemDiv,
  Title,
  ItemMainDiv,
  Label,
  TopDiv,
  CountText,
  LeftDiv,
  ProfileDrop,
  Frame1,
  Frame2,
  OrganizationProfile,
  Description,
  ProfileItemDiv,
  OrganizationNameDiv,
  ResponsiveMainDiv,
};
