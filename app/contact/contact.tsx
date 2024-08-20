'use client';
import React, { useState } from 'react';
import { HeaderDiv, Main, MainDiv, Tab, TabDiv, Title, TopDiv } from './style';
import PersonList from './personList';
import CompanyList from './companyList';

export default function Contact() {
  const [activeTab, setActiveTab] = useState('People');
  const tabItem = ['People', 'Company'];
  return (
    <Main>
      <MainDiv>
        <TopDiv>
          <HeaderDiv>
            <Title>Contact</Title>
            <TabDiv>
              {tabItem.map((tab) => (
                <Tab
                  key={tab}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Tab>
              ))}
            </TabDiv>
          </HeaderDiv>
        </TopDiv>
        <div style={{ padding: '0 20px' }}>
          {activeTab === 'People' && <PersonList />}
          {activeTab === 'Company' && <CompanyList />}
        </div>
      </MainDiv>
    </Main>
  );
}
