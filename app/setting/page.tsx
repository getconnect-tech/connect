'use client';
import React from 'react';
import { Div, IconDiv, MainDiv } from './style';
import SettingNavBar from '@/components/settingNavBar/settingNavBar';
import SVGIcon from '@/assets/icons/SVGIcon';

export default function Setting() {
  return (
    <MainDiv>
      <IconDiv>
        <SVGIcon
          name='cross-icon'
          width='16px'
          height='16px'
          viewBox='0 0 16 16'
        />
      </IconDiv>
      <Div>
        <SettingNavBar />
      </Div>
    </MainDiv>
  );
}
