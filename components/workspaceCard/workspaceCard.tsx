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
`;

interface Props {
  organizationName: string;
  src?: string;
}

function WorkspaceCard({ organizationName, src = '' }: Props) {
  return (
    <Card>
      <Avatar imgSrc={src} name={''} isShowBorder />
      <p>{organizationName}</p>
    </Card>
  );
}

export default WorkspaceCard;
