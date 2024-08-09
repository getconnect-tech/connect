'use client';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Div, MainDiv } from './style';
import SettingNavBar from '@/components/settingNavBar/settingNavBar';

export default function Setting() {
  const router = useRouter();
  const pathname = usePathname();
  const defaultPath = '/setting/myprofile';

  useEffect(() => {
    if (pathname === '/setting') {
      router.push(defaultPath);
    }
  }, [pathname, router]);
  return (
    <MainDiv>
      <Div>
        <SettingNavBar />
      </Div>
    </MainDiv>
  );
}
