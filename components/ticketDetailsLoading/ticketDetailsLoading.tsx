import React from 'react';
import {
  ActivityBottom,
  ActivityItemDiv,
  ActivityLeft,
  ActivityProfile,
  ActivityRight,
  ActivitySectionDiv,
  Avtar,
  Bottom,
  BottomHeader,
  CenterDiv,
  DotIcon,
  Header,
  LineDiv,
  Profile,
  Top,
  TopHeader,
} from './style';

function TicketDetailsLoading() {
  return (
    <div>
      <Header>
        <TopHeader>
          <Avtar>
            <Profile className='loading-animation' />
          </Avtar>
          <Top className='loading-animation' />
        </TopHeader>
        <BottomHeader>
          <div className='left-side'>
            <Bottom className='loading-animation' />
            <Bottom className='center loading-animation' />
            <Bottom className='last loading-animation' />
          </div>
          <div className='left-side'>
            <Bottom className='center-right loading-animation' />
            <Bottom className='last-right loading-animation' />
          </div>
        </BottomHeader>
      </Header>
      <div style={{ padding: '0 20px' }}>
        <CenterDiv>
          <ActivitySectionDiv>
            <ActivityItemDiv>
              <ActivityProfile className='loading-animation' />
              <ActivityLeft className='loading-animation' />
              <DotIcon className='loading-animation' />
              <ActivityRight className='loading-animation' />
            </ActivityItemDiv>
            <LineDiv />
            <ActivityItemDiv className='second-loading'>
              <ActivityProfile className='loading-animation' />
              <ActivityLeft className='loading-animation' />
              <DotIcon className='loading-animation' />
              <ActivityRight className='loading-animation' />
            </ActivityItemDiv>
            <LineDiv />
            <ActivityItemDiv className='second-loading'>
              <ActivityProfile className='loading-animation' />
              <ActivityLeft className='loading-animation' />
              <DotIcon className='loading-animation' />
              <ActivityRight className='loading-animation' />
            </ActivityItemDiv>
            <LineDiv />
            <ActivityItemDiv className='third-loading'>
              <ActivityProfile className='loading-animation' />
              <ActivityBottom className='loading-animation' />
            </ActivityItemDiv>
            <LineDiv />
            <ActivityItemDiv className='third-loading'>
              <ActivityProfile className='loading-animation' />
              <ActivityBottom className='loading-animation' />
            </ActivityItemDiv>
          </ActivitySectionDiv>
        </CenterDiv>
      </div>
    </div>
  );
}

export default TicketDetailsLoading;
