/* eslint-disable max-len */
'use client';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import MyProfile from './myprofile/page';

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
    <>
      <MyProfile />
    </>
  );
}
