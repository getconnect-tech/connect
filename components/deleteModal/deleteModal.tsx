import React from 'react';
import Button from '../button/button';
import { BottomDiv, Content, Header, MainDiv } from './style';

interface Props {
  headTitle: string;
  title: string;
  description: string;
  onClose: () => void;
  onDelete: () => void;
  loading?: boolean;
}
function DeleteModal({
  headTitle,
  title,
  description,
  onClose,
  onDelete,
  loading,
}: Props) {
  return (
    <MainDiv>
      <Header>{headTitle}</Header>
      <Content>
        <h2>{title}</h2>
        <p>{description}</p>
      </Content>
      <BottomDiv>
        <Button
          title='Cancel'
          secondary={true}
          onClick={onClose}
          variant='medium'
        />
        <Button
          title='Delete'
          isDelete={true}
          variant='medium'
          onClick={onDelete}
          isLoading={loading}
        />
      </BottomDiv>
    </MainDiv>
  );
}

export default DeleteModal;
