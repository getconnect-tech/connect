'use client';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Div, IconDiv, MainDiv } from './style';
import SettingNavBar from '@/components/settingNavBar/settingNavBar';
import SVGIcon from '@/assets/icons/SVGIcon';

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
