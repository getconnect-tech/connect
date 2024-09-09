import React from 'react';
import styled from 'styled-components';
import Avatar from '../avtar/Avtar';
import { Typography } from '@/styles/typography';

export const Card = styled.div`
  display: flex;
  max-width: 220px;
  width: 100%;
  padding: 12px;
  gap: 12px;
  box-shadow: var(--shadow-card);
  background-color: var(--bg-white);
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
  p {
    ${Typography.body_md_medium}
    color: var(--text);
  }
  &:hover {
    box-shadow: var(--shadow-card-hover);
  }
`;

interface Props {
  organizationName: string;
  src?: string;
  // eslint-disable-next-line no-unused-vars
  handleClick: (id: string) => void;
  workSpaceId: string;
}

function WorkspaceCard({
  organizationName,
  src = '',
  handleClick,
  workSpaceId,
}: Props) {
  return (
    <Card onClick={() => handleClick(workSpaceId)}>
      <Avatar imgSrc={src} name={organizationName} size={25} />
      <p>{organizationName}</p>
    </Card>
  );
}

export default WorkspaceCard;
