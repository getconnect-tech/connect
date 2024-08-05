'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { Provider } from 'mobx-react';
import stores from '@/stores';
import { appInit } from '@/helpers/appInitHelper';
import { APP_INIT_RESPONSE_TYPE } from '@/global/constants';
import { isEmpty } from '@/helpers/common';

export default function AppProvider({
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
    return <Provider {...stores}>{children}</Provider>;
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <Provider {...stores}>{children}</Provider>
    </StyleSheetManager>
  );
}
