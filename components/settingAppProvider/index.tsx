'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useServerInsertedHTML } from 'next/navigation';
import styled, { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { Provider } from 'mobx-react';
import SettingNavBar from '../settingNavBar/settingNavBar';
import { IconDiv } from '../settingNavBar/style';
import stores from '@/stores';
import { appInit } from '@/helpers/appInitHelper';
import { APP_INIT_RESPONSE_TYPE } from '@/global/constants';
import { isEmpty } from '@/helpers/common';
import { colors } from '@/styles/colors';
import SVGIcon from '@/assets/icons/SVGIcon';

export const Div = styled.div`
  display: flex;
  gap: 32px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 884px;
  width: 100%;
`;

export const MainDiv = styled.div`
  background-color: ${colors.bg_surface};
  height: 100vh;
`;

export default function SettingAppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  const init = useCallback(async () => {
    try {
      const result = await appInit();
      if (
        result.type === APP_INIT_RESPONSE_TYPE.REDIRECT &&
        !isEmpty(result.path)
      )
        router.push(result.path);
    } catch (error) {
      console.log('ERROR', error);
    }
  }, [router]);

  useEffect(() => {
    init();
  }, [init]);

  if (typeof window !== 'undefined')
    return (
      <Provider {...stores}>
        <MainDiv>
          <IconDiv
            onClick={() => {
              router.push('/');
            }}
          >
            <SVGIcon
              name='cross-icon'
              width='16'
              height='16'
              viewBox='0 0 16 16'
            />
          </IconDiv>
          <Div>
            <SettingNavBar />
            {children}
          </Div>
        </MainDiv>
      </Provider>
    );

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <Provider {...stores}>{children}</Provider>
    </StyleSheetManager>
  );
}
