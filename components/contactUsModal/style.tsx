import styled from 'styled-components';
import { Typography } from '@/styles/typography';

export const ModalDiv = styled.div`
  max-width: 500px;
  width: 100%;
  border-radius: 12px;
  min-width: 500px;
  min-height: 437px;
  background-color: var(--bg-white);
  position: relative;
  overflow: auto;
  .richtext {
    padding: 12px 16px;
    .e-richtexteditor .e-rte-content .e-content {
      max-height: 296px;
      min-height: 296px;
      margin-bottom: 0;
    }
  }
  @media screen and (max-width: 449px) {
    min-width: 390px;
    max-width: 390px;
  }
`;

export const ModalHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--bg-white);
  border-bottom: var(--border-main);
  padding: 12px 16px;
  z-index: 11;
`;

export const ModalTitle = styled.div`
  ${Typography.body_md_semibold}
  color: var(--text);
`;

export const ModalDescription = styled.div`
  ${Typography.body_md_regular}
  color: var(--text-text-secondary);
`;
export const ModalBottom = styled.div`
  display: flex;
  padding: 8px 16px 12px 16px;
  border-top: var(--border-main);
  justify-content: space-between;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: var(--bg-white);
`;

export const RightDiv = styled.div`
  display: flex;
  gap: 8px;
`;

export const RemoveIcon = styled.div`
  display: none;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  svg {
    fill: var(--icon);
  }
  &:hover {
    background: var(--bg-surface-hover);
    svg {
      fill: var(--icon-hover);
    }
  }
`;

export const FileCard = styled.div`
  display: flex;
  max-width: 162px;
  min-width: 162px;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  gap: 8px;
  background-color: var(--bg-white);
  box-shadow: var(--shadow-card);
  align-items: center;
  position: relative;
  &:hover ${RemoveIcon} {
    display: flex;
  }
`;

export const FileCardRight = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 98px;
  width: 100%;
  h2 {
    ${Typography.body_sm_medium}
    color: var(--text);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  p {
    ${Typography.body_sm_regular}
    color: var(--text-text-secondary)
  }
`;

export const IconDiv = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
`;

export const FileCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px 16px;
  background-color: var(--bg-white);
  position: sticky;
  bottom: 0;
  z-index: 1;
`;

export const CloseIconDiv = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

export const SuccessfullModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding-top: 162px;
`;

export const IllustrationDiv = styled.div`
  width: 56px;
  height: 56px;
  padding: 16px;
  border-radius: 50%;
  background-color: var(--bg-white-hover);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  h2 {
    ${Typography.body_md_semibold}
    color: var(--text);
  }
  p {
    ${Typography.body_md_regular}
    color: var(--text-text-secondary);
  }
`;

export const ModalContant = styled.div`
  overflow: auto;
  max-height: 320px;
`;
