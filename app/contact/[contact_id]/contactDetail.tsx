'use client';
import React, { useCallback, useState } from 'react';
import ResponsiveNavbar from '@/components/navbar/ResponsiveNavbar';
import Icon from '@/components/icon/icon';
import { HeaderDiv, Main, MainDiv, Title, TopDiv } from '../style';

function ContactDetail() {
  const [isNavbar, setIsNavbar] = useState(false);

  const onClickIcon = useCallback(() => {
    setIsNavbar(true);
  }, []);

  const onCloseNavbar = useCallback(() => {
    setIsNavbar(false);
  }, []);

  return (
    <Main>
      {isNavbar && <ResponsiveNavbar onClose={onCloseNavbar} />}
      <MainDiv>
        <TopDiv>
          <HeaderDiv>
            <div className='title-div'>
              <Icon
                iconName='sidebar-icon'
                iconSize='16'
                iconViewBox='0 0 16 16'
                className='sidebar-icon'
                onClick={onClickIcon}
              />
              <Title>Contact</Title>
            </div>
          </HeaderDiv>
        </TopDiv>
      </MainDiv>
    </Main>
  );
}

export default ContactDetail;
