'use client';

import React, { useState } from 'react';
import { useRouter, useServerInsertedHTML } from 'next/navigation';
import styled, { ServerStyleSheet } from 'styled-components';
import { Provider } from 'mobx-react';
import SettingNavBar from '../settingNavBar/settingNavBar';
import Icon from '../icon/icon';
import stores from '@/stores';

export const Div = styled.div`
  display: flex;
  gap: 64px;
  margin: auto;
  max-width: 916px;
  width: 100%;
`;

export const MainDiv = styled.div`
  background-color: var(--bg-surface);
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
}
