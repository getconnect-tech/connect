/* eslint-disable max-len */
import React from 'react';
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

interface Props {
  imgSrc: string;
  name: string;
  email: string;
  comapanyImg?: string;
  isCompany?: boolean;
  companyName?: string;
  openCount: string;
  closeCount: string;
  peopleCount?: string;
}

export default function ContactCard({
  imgSrc,
  name,
  email,
  comapanyImg = '',
  isCompany = true,
  companyName,
  openCount,
  closeCount,
  peopleCount,
}: Props) {
  return (
    <CardMainDiv>
      <LeftDiv>
        <Avatar
          imgSrc={imgSrc}
          name={''}
          size={28}
          isShowBorder={!isCompany && true}
        />
        <TitleDiv>
          <h6>{name}</h6>
          <div>
            <p>{email}</p>
            {isCompany ? (
              <CompanyDiv>
                <DotIcon />
                <CompanyNameDiv>
                  <Avatar
                    imgSrc={comapanyImg}
                    name={''}
                    size={20}
                    isShowBorder={true}
                  />
                  <p>{companyName}</p>
                </CompanyNameDiv>
              </CompanyDiv>
            ) : (
              <>
                <CompanyDiv>
                  <DotIcon />
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