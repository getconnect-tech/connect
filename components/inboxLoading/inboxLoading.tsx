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
                <Top className='loading-animation' />
                <Top className='center loading-animation' />
                <Top className='bottom loading-animation' />
              </Subdiv>
              <BottomDiv>
                <Bottom className='loading-animation' />
                <Bottom className='loading-animation' />
                <Bottom className='loading-animation' />
              </BottomDiv>
            </TopDiv>
          </Rightside>
          <Leftside className='loading-animation' />
        </Firstblock>
        <Firstblock className='second-block'>
          <Rightside>
            <DotIcon className='loading-animation' />
            <Avtar>
              <Profile className='loading-animation' />
            </Avtar>
            <TopDiv>
              <Subdiv>
                <Top className='loading-animation' />
                <Top className='center loading-animation' />
                <Top className='bottom loading-animation' />
              </Subdiv>
              <BottomDiv>
                <Bottom className='loading-animation' />
                <Bottom className='loading-animation' />
                <Bottom className='loading-animation' />
              </BottomDiv>
            </TopDiv>
          </Rightside>
          <Leftside className='loading-animation' />
        </Firstblock>
        <Firstblock className='third-block'>
          <Rightside>
            <Avtar>
              <Profile className='loading-animation' />
            </Avtar>
            <TopDiv>
              <Subdiv>
                <Top className='loading-animation' />
                <Top className='center loading-animation' />
                <Top className='bottom loading-animation' />
              </Subdiv>
              <BottomDiv>
                <Bottom className='loading-animation' />
                <Bottom className='loading-animation' />
                <Bottom className='loading-animation' />
              </BottomDiv>
            </TopDiv>
          </Rightside>
          <Leftside className='loading-animation' />
        </Firstblock>
        <Firstblock className='fourth-block'>
          <Rightside>
            <Avtar>
              <Profile className='loading-animation' />
            </Avtar>
            <TopDiv>
              <Subdiv>
                <Top className='loading-animation' />
                <Top className='center loading-animation' />
                <Top className='bottom loading-animation' />
              </Subdiv>
              <BottomDiv>
                <Bottom className='loading-animation' />
                <Bottom className='loading-animation' />
                <Bottom className='loading-animation' />
              </BottomDiv>
            </TopDiv>
          </Rightside>
          <Leftside className='loading-animation' />
        </Firstblock>
      </Main>
    </>
  );
}
