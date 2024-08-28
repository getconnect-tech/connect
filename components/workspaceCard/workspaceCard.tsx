import React from 'react';
import styled from 'styled-components';
import Avatar from '../avtar/Avtar';
import { colors } from '@/styles/colors';
import { Typography } from '@/styles/typography';

export const Card = styled.div`
  display: flex;
  max-width: 220px;
  width: 100%;
  padding: 12px;
  gap: 12px;
  box-shadow:
    0px 0px 0px 0.5px ${colors.box_shadow},
    0px 2px 4px 0px ${colors.box_shadow_2};
  background-color: ${colors.bg_white};
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
  p {
    ${Typography.body_md_medium}
    color: ${colors.text};
  }
  &:hover {
    box-shadow:
      0px 0px 0px 0.5px ${colors.box_shadow_3},
      0px 2px 4px 0px ${colors.box_shadow_2};
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
