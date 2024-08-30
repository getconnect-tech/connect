'use client';

import React from 'react';

interface Props {
  label_id: string;
}

const labelDetails = (props: Props) => {
  const { label_id } = props;
  return <div>{label_id}</div>;
};

export default labelDetails;
