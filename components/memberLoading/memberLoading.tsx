import React from 'react';
import {
  Avtar,
  Firstblock,
  Leftside,
  Main,
  Profile,
  Rightside,
  Subdiv,
  Top,
  TopDiv,
} from './style';

function MemberLoading() {
  return (
    <Main>
      <Firstblock>
        <Rightside>
          <TopDiv>
            <Avtar>
              <Profile className='loading-animation' />
            </Avtar>
            <Subdiv>
              <Top className='center loading-animation' />
              <Top className='loading-animation' />
            </Subdiv>
          </TopDiv>
        </Rightside>
        <div className='left-div'>
          <Leftside className='loading-animation' />
        </div>
      </Firstblock>
      <Firstblock className='second-block'>
        <Rightside>
          <TopDiv>
            <Avtar>
              <Profile className='loading-animation' />
            </Avtar>
            <Subdiv>
              <Top className='center loading-animation' />
              <Top className='loading-animation' />
            </Subdiv>
          </TopDiv>
        </Rightside>
        <div className='left-div'>
          <Leftside className='loading-animation' />
        </div>
      </Firstblock>
      <Firstblock className='third-block'>
        <Rightside>
          <TopDiv>
            <Avtar>
              <Profile className='loading-animation' />
            </Avtar>
            <Subdiv>
              <Top className='center loading-animation' />
              <Top className='loading-animation' />
            </Subdiv>
          </TopDiv>
        </Rightside>
        <div className='left-div'>
          <Leftside className='loading-animation' />
        </div>
      </Firstblock>
      <Firstblock className='fourth-block'>
        <Rightside>
          <TopDiv>
            <Avtar>
              <Profile className='loading-animation' />
            </Avtar>
            <Subdiv>
              <Top className='center loading-animation' />
              <Top className='loading-animation' />
            </Subdiv>
          </TopDiv>
        </Rightside>
        <div className='left-div'>
          <Leftside className='loading-animation' />
        </div>
      </Firstblock>
    </Main>
  );
}

export default MemberLoading;
