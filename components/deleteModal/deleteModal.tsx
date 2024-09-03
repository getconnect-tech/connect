import React from 'react';
import Button from '../button/button';
import { BottomDiv, Content, Header, MainDiv } from './style';

interface Props {
  headTitle: string;
  title: string;
  description: string;
  onclose: () => void;
  onDelete: () => void;
}
function DeleteModal({
  headTitle,
  title,
  description,
  onclose,
  onDelete,
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
          onClick={onclose}
          variant='medium'
        />
        <Button
          title='Delete'
          isDelete={true}
          variant='medium'
          onClick={onDelete}
        />
      </BottomDiv>
    </MainDiv>
  );
}

export default DeleteModal;
