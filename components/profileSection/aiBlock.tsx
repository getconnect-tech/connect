import React from 'react';
import { AIIcon, ProfileDiv, Title } from './styles';
import SVGIcon from '@/assets/icons/SVGIcon';

function AIBlock() {
  return (
    <ProfileDiv>
      <AIIcon>
        <SVGIcon name='ai-icon' width='12' height='12' viewBox='0 0 12 12' />
      </AIIcon>
      <Title>Connect AI</Title>
    </ProfileDiv>
  );
}

export default AIBlock;
