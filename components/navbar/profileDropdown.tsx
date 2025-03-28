/* eslint-disable no-undef */
import React, { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import SVGIcon from '@/assets/icons/SVGIcon';
import { logout } from '@/services/clientSide/authService';
import {
  Description,
  Frame1,
  Frame2,
  OrganizationProfile,
  ProfileDrop,
  ProfileItemDiv,
} from './style';
interface Props {
  title: string;
  onClose: () => void;
}
export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (target.closest(`.tag-div`)) {
          return;
        }
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};
export default function ProfileDropdown({ title, onClose }: Props) {
  const router = useRouter();
  const dropDownRef = useOutsideClick(onClose);

  const onClickLogout = useCallback(async () => {
    await logout();
    router.push('/login');
  }, [router]);

  return (
    <>
      <ProfileDrop onClick={onClose} ref={dropDownRef}>
        <Frame1
          onClick={() => {
            router.push('/selectworkspace');
          }}
        >
          <OrganizationProfile>
            <p>{title}</p>
            <Description>Add or switch organization</Description>
          </OrganizationProfile>
        </Frame1>
        <Frame2>
          <ProfileItemDiv
            onClick={() => {
              router.push('/setting');
            }}
          >
            <SVGIcon
              name='setting-icon'
              width='12px'
              height='12px'
              viewBox='0 0 12 12'
            />
            <p>Settings</p>
          </ProfileItemDiv>
          <ProfileItemDiv onClick={onClickLogout}>
            <SVGIcon
              name='logout-icon'
              width='12px'
              height='12px'
              viewBox='0 0 12 12'
            />
            <p>Log out</p>
          </ProfileItemDiv>
        </Frame2>
      </ProfileDrop>
    </>
  );
}
