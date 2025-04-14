'use client';

import React from 'react';
import { Provider } from 'mobx-react';
import { stores } from '@/stores';
import GroupDetailComponent from './groupDetail';

interface Props {
  params: {
    groupId: string;
  };
}

export default function GroupPage({ params }: Props) {
  return (
    <Provider {...stores}>
      <GroupDetailComponent groupId={params.groupId} />
    </Provider>
  );
} 