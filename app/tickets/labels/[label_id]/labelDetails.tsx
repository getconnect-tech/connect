'use client';

import React from 'react';
import Inbox from '@/app/inbox/inbox';

interface Props {
  label_id: string;
}

const labelDetails = (props: Props) => {
  const { label_id } = props;
  return <Inbox labelId={label_id} />;
};

export default labelDetails;
