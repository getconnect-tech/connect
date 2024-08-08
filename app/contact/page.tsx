'use client';
import React, { useState } from 'react';
import NavbarPage from '../../components/navbar/index';
import { HeaderDiv, Main, MainDiv, Tab, TabDiv, Title, TopDiv } from './style';
import PersonList from './personList';
import CompanyList from './companyList';

export default function Contact() {
  const [activeTab, setActiveTab] = useState('People');
  const tabItem = ['People', 'Company'];
  return (
    <Main>
      <NavbarPage />
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
        <div>
          {activeTab === 'People' && <PersonList />}
          {activeTab === 'Company' && <CompanyList />}
        </div>
      </MainDiv>
    </Main>
  );
}
