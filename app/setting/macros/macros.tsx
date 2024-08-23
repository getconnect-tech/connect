/* eslint-disable max-len */
'use client';
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Description,
  Head,
  LeftDiv,
  Main,
  MainCardDiv,
  MainDiv,
  RightDiv,
  Title,
} from '../style';
import Button from '@/components/button/button';
import EmptyState from '@/components/emptyState/emptyState';
import { isEmpty } from '@/helpers/common';
import MacroCard from '@/components/macroCard/macroCard';

const Macros = () => {
  const [currentOpenDropdown, setCurrentOpenDropdown] = useState<string | null>(
    null,
  );

  const macros = [
    {
      name: 'Template 1',
      description: 'Urgent: Immediate Attention Needed',
      id: 1,
    },
    { name: 'Template 2', description: 'Thank You for Your Support', id: 2 },
    {
      name: 'Template 3',
      description: 'Follow-Up on Previous Conversation',
      id: 3,
    },
    {
      name: 'Template 4',
      description: 'Request for Feedback on Connect.',
      id: 4,
    },
    { name: 'Template 5', description: 'Welcome to Our Team!', id: 5 },
  ];

  return (
    <>
      <Main>
        <MainDiv>
          <RightDiv>
            <Head>
              <LeftDiv>
                <Title>Macros</Title>
                <Description>Manage workspace macros</Description>
              </LeftDiv>
              {!isEmpty(macros) && (
                <Button
                  iconName='label-plus-icon'
                  title='New Macros'
                  onClick={() => ''}
                  iconSize='10'
                  iconViewBox='0 0 10 10'
                  iconColor='white'
                  variant='medium'
                />
              )}
            </Head>
            {isEmpty(macros) && (
              <EmptyState
                iconName='empty-macro-icon'
                iconSize='20'
                iconViewBox='0 0 20 20'
                title='No Macros created yet'
                buttonTitle='New Macro'
                className='empty-state'
                description='Create Macros to help when sending the emails.'
                buttonIconName='label-plus-icon'
                buttonIconSize='10'
                buttonIconViewBox='0 0 10 10'
              />
            )}
            {!isEmpty(macros) && (
              <MainCardDiv>
                {macros.map((macros, index) => (
                  <MacroCard
                    key={index}
                    name={macros.name}
                    description={macros.description}
                    currentOpenDropdown={currentOpenDropdown}
                    setCurrentOpenDropdown={setCurrentOpenDropdown}
                    dropdownIdentifier={`card-${macros.id}`}
                  />
                ))}
              </MainCardDiv>
            )}
          </RightDiv>
        </MainDiv>
      </Main>
    </>
  );
};

export default observer(Macros);