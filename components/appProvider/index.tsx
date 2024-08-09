'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, usePathname, useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { Provider } from 'mobx-react';
import NavbarPage from '../navbar';
import stores from '@/stores';
import { appInit } from '@/helpers/appInitHelper';
import { APP_INIT_RESPONSE_TYPE, ONBOARDING_ROUTES } from '@/global/constants';
import { isEmpty } from '@/helpers/common';

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  let NavbarComponent = null;
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

  if (ONBOARDING_ROUTES.includes(pathname)) {
    NavbarComponent = null; // No navbar for these screens
  } else if (pathname.startsWith('/settings')) {
    // NavbarComponent = <SettingsNavbar />; // Different navbar for settings screen
  } else {
    NavbarComponent = <NavbarPage />; // Default navbar
  }

  if (typeof window !== 'undefined')
    return (
      <Provider {...stores}>
        {NavbarComponent}
        {children}
      </Provider>
    );

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {NavbarComponent}
      <Provider {...stores}>{children}</Provider>
    </StyleSheetManager>
  );
}
