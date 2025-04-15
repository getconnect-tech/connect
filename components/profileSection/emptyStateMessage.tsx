import React from 'react';
import { EmptyStateText } from './styles';

interface Props {
  message: string;
}

function EmptyStateMessage({ message }: Props) {
  return (
    <>
      <EmptyStateText>{message}</EmptyStateText>
    </>
  );
}

export default EmptyStateMessage;
