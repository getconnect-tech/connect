'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useServerInsertedHTML } from 'next/navigation';
import styled, { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { Provider } from 'mobx-react';
import SettingNavBar from '../settingNavBar/settingNavBar';
import Icon from '../icon/icon';
import stores from '@/stores';
import { appInit } from '@/helpers/appInitHelper';
import { APP_INIT_RESPONSE_TYPE } from '@/global/constants';
import { isEmpty } from '@/helpers/common';
import { colors } from '@/styles/colors';

export const Div = styled.div`
  display: flex;
  gap: 64px;
  margin: auto;
  max-width: 916px;
  width: 100%;
`;

export const MainDiv = styled.div`
  background-color: ${colors.bg_surface};
  height: 100vh;
  overflow: auto;
  .icon {
    position: fixed;
    top: 20px;
    right: 20px;
  }
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
          <Icon
            onClick={() => {
              router.push('/');
            }}
            iconName={'cross-icon'}
            iconSize={'16'}
            iconViewBox={'0 0 16 16'}
            className='icon'
          />
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
