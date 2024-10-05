import React from 'react';
import {
  AvtarDiv,
  CardDetail,
  CompanyNameDiv,
  ContentDiv,
  MainCardDiv,
  MainDiv,
  NameDiv,
  TicketCountDiv,
} from './style';

function ContactsLoading() {
  return (
    <MainDiv>
      <MainCardDiv>
        <CardDetail>
          <AvtarDiv className='loading-animation' />
          <ContentDiv>
            <NameDiv className='loading-animation' />
            <CompanyNameDiv className='loading-animation' />
          </ContentDiv>
        </CardDetail>
        <TicketCountDiv className='loading-animation' />
      </MainCardDiv>

      <MainCardDiv className='second-card'>
        <CardDetail>
          <AvtarDiv className='loading-animation' />
          <ContentDiv>
            <NameDiv className='loading-animation' />
            <CompanyNameDiv className='loading-animation' />
          </ContentDiv>
        </CardDetail>
        <TicketCountDiv className='loading-animation' />
      </MainCardDiv>

      <MainCardDiv className='third-card'>
        <CardDetail>
          <AvtarDiv className='loading-animation' />
          <ContentDiv>
            <NameDiv className='loading-animation' />
            <CompanyNameDiv className='loading-animation' />
          </ContentDiv>
        </CardDetail>
        <TicketCountDiv className='loading-animation' />
      </MainCardDiv>

      <MainCardDiv className='fourth-card'>
        <CardDetail>
          <AvtarDiv className='loading-animation' />
          <ContentDiv>
            <NameDiv className='loading-animation' />
            <CompanyNameDiv className='loading-animation' />
          </ContentDiv>
        </CardDetail>
        <TicketCountDiv className='loading-animation' />
      </MainCardDiv>
    </MainDiv>
  );
}

export default ContactsLoading;
