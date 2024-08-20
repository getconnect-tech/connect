import React from 'react';
import {
  Firstblock,
  Leftside,
  Main,
  Rightside,
  Subdiv,
  Top,
  TopDiv,
} from './style';

function ApiKeyLoading() {
  return (
    <Main>
      <Firstblock>
        <Rightside>
          <TopDiv>
            <Subdiv>
              <Top className='center loading-animation' />
              <Top className='loading-animation' />
            </Subdiv>
          </TopDiv>
        </Rightside>
        <div className='left-div'>
          <Leftside className='loading-animation' />
          <Leftside className='loading-animation' />
        </div>
      </Firstblock>
      <Firstblock className='second-block'>
        <Rightside>
          <TopDiv>
            <Subdiv>
              <Top className='center loading-animation' />
              <Top className='loading-animation' />
            </Subdiv>
          </TopDiv>
        </Rightside>
        <div className='left-div'>
          <Leftside className='loading-animation' />
          <Leftside className='loading-animation' />
        </div>
      </Firstblock>
      <Firstblock className='third-block'>
        <Rightside>
          <TopDiv>
            <Subdiv>
              <Top className='center loading-animation' />
              <Top className='loading-animation' />
            </Subdiv>
          </TopDiv>
        </Rightside>
        <div className='left-div'>
          <Leftside className='loading-animation' />
          <Leftside className='loading-animation' />
        </div>
      </Firstblock>
      <Firstblock className='fourth-block'>
        <Rightside>
          <TopDiv>
            <Subdiv>
              <Top className='center loading-animation' />
              <Top className='loading-animation' />
            </Subdiv>
          </TopDiv>
        </Rightside>
        <div className='left-div'>
          <Leftside className='loading-animation' />
          <Leftside className='loading-animation' />
        </div>
      </Firstblock>
    </Main>
  );
}

export default ApiKeyLoading;
