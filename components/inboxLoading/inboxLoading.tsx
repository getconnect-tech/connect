import React from 'react';
import {
  Avtar,
  Bottom,
  BottomDiv,
  DotIcon,
  Firstblock,
  Leftside,
  Main,
  Profile,
  ResponsiveSide,
  Rightside,
  Subdiv,
  Top,
  TopDiv,
} from './style';

export default function InboxLoading() {
  return (
    <>
      <Main>
        <Firstblock>
          <Rightside>
            <DotIcon className='loading-animation' />
            <Avtar>
              <Profile className='loading-animation' />
            </Avtar>
            <TopDiv>
              <Subdiv>
                <div className='top-loading'>
                  <Top className='loading-animation' />
                  <Leftside className='loading-animation' />
                </div>
                <Top className='center loading-animation' />
                <Top className='bottom loading-animation' />
              </Subdiv>
              <BottomDiv>
                <Bottom className='loading-animation' />
                <Bottom className='loading-animation center' />
                <Bottom className='loading-animation last' />
              </BottomDiv>
              <ResponsiveSide className='loading-animation' />
            </TopDiv>
          </Rightside>
        </Firstblock>
        <Firstblock className='second-block'>
          <Rightside>
            <DotIcon className='loading-animation' />
            <Avtar>
              <Profile className='loading-animation' />
            </Avtar>
            <TopDiv>
              <Subdiv>
                <div className='top-loading'>
                  <Top className='loading-animation' />
                  <Leftside className='loading-animation' />
                </div>
                <Top className='center loading-animation' />
                <Top className='bottom loading-animation' />
              </Subdiv>
              <BottomDiv>
                <Bottom className='loading-animation' />
                <Bottom className='loading-animation center' />
                <Bottom className='loading-animation last' />
              </BottomDiv>
              <ResponsiveSide className='loading-animation' />
            </TopDiv>
          </Rightside>
        </Firstblock>
        <Firstblock className='third-block'>
          <Rightside>
            <Avtar>
              <Profile className='loading-animation' />
            </Avtar>
            <TopDiv>
              <Subdiv>
                <div className='top-loading'>
                  <Top className='loading-animation' />
                  <Leftside className='loading-animation' />
                </div>
                <Top className='center loading-animation' />
                <Top className='bottom loading-animation' />
              </Subdiv>
              <BottomDiv>
                <Bottom className='loading-animation' />
                <Bottom className='loading-animation center' />
                <Bottom className='loading-animation last' />
              </BottomDiv>
              <ResponsiveSide className='loading-animation' />
            </TopDiv>
          </Rightside>
        </Firstblock>
        <Firstblock className='fourth-block'>
          <Rightside>
            <Avtar>
              <Profile className='loading-animation' />
            </Avtar>
            <TopDiv>
              <Subdiv>
                <div className='top-loading'>
                  <Top className='loading-animation' />
                  <Leftside className='loading-animation' />
                </div>
                <Top className='center loading-animation' />
                <Top className='bottom loading-animation' />
              </Subdiv>
              <BottomDiv>
                <Bottom className='loading-animation' />
                <Bottom className='loading-animation center' />
                <Bottom className='loading-animation last' />
              </BottomDiv>
              <ResponsiveSide className='loading-animation' />
            </TopDiv>
          </Rightside>
        </Firstblock>
      </Main>
    </>
  );
}
