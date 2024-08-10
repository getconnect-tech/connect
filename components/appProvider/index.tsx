'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, usePathname, useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { Provider } from 'mobx-react';
import NavbarPage from '../navbar';
import SettingAppProvider from '../settingAppProvider';
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
      ) {
        router.push(result.path);
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  }, [router]);

  useEffect(() => {
    init();
  }, [init]);

  // Conditional check to render SettingAppProvider if the pathname is '/setting'
  if (pathname.startsWith('/setting')) {
    return <SettingAppProvider>{children}</SettingAppProvider>;
  }

  if (ONBOARDING_ROUTES.includes(pathname)) {
    NavbarComponent = null;
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
