'use client';

import React from 'react';
import GroupDetailComponent from './groupDetail';

interface Props {
  params: {
    groupId: string;
  };
}

export default function GroupPage({ params }: Props) {
  return <GroupDetailComponent groupId={params.groupId} />;
} 