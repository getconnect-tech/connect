/* eslint-disable max-len */
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '../avtar/Avtar';
import {
  CardMainDiv,
  CompanyDiv,
  CompanyNameDiv,
  DotIcon,
  LeftDiv,
  RightDiv,
  TitleDiv,
} from './style';

interface GroupInfo {
  id: string;
  name: string;
  avatar: string | null;
  group_id: string | null;
}

interface Props {
  imgSrc: string;
  name: string;
  email?: string;
  isCompany?: boolean;
  groupInfo?: GroupInfo[];
  openCount: string;
  closeCount: string;
  peopleCount?: string;
  isShowNavbar: boolean;
  contactId?: string;
}

export default function ContactCard({
  imgSrc,
  name,
  email,
  isCompany = false,
  groupInfo,
  openCount,
  closeCount,
  peopleCount,
  isShowNavbar,
  contactId,
}: Props) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    const basePath = isCompany ? 'company' : 'contact';
    if (contactId) {
      router.push(`/${basePath}/${contactId}`);
    }
  }, [isCompany, contactId, router]);

  return (
    <CardMainDiv onClick={handleClick} isShowNavbar={isShowNavbar}>
      <LeftDiv>
        <Avatar
          imgSrc={imgSrc}
          name={name}
          size={28}
          isShowBorder={!isCompany && true}
        />
        <TitleDiv>
          <h6>{name}</h6>
          <div className='company-maindiv'>
            {email && (
              <>
                <p>{email}</p>
              </>
            )}
            {!isCompany ? (
              <CompanyDiv>
                {groupInfo?.slice(0, 2).map((group, index) => (
                  <>
                    {!index && <DotIcon />}
                    <CompanyNameDiv key={group.id}>
                      <Avatar
                        imgSrc={
                          group?.avatar
                            ? group.avatar === 'undefined' ||
                              group.avatar === 'null'
                              ? ''
                              : group.avatar
                            : ''
                        }
                        name={group.name}
                        size={20}
                        isShowBorder={true}
                      />
                      <p>{group.name}</p>
                    </CompanyNameDiv>
                  </>
                ))}
              </CompanyDiv>
            ) : (
              <>
                <CompanyDiv>
                  <p>{peopleCount} people</p>
                </CompanyDiv>
              </>
            )}
          </div>
        </TitleDiv>
      </LeftDiv>
      <RightDiv>
        <p>{openCount} Open</p>
        <DotIcon />
        <p>{closeCount} Closed</p>
      </RightDiv>
    </CardMainDiv>
  );
}
