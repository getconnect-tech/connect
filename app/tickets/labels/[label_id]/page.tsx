/* eslint-disable max-len */
import React from 'react';
import LabelDetails from './labelDetails';

export default function Labels({
  params: { label_id },
}: {
  params: { label_id: string };
}) {
  return <LabelDetails label_id={label_id} />;
}
