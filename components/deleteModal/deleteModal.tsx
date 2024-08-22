import React from 'react';
import Button from '../button/button';
import { BottomDiv, Content, Header, MainDiv } from './style';

interface Props {
  headTitle: string;
  title: string;
  description: string;
  onclose: () => void;
}
function DeleteModal({ headTitle, title, description, onclose }: Props) {
  return (
    <MainDiv>
      <Header>{headTitle}</Header>
      <Content>
        <h2>{title}</h2>
        <p>{description}</p>
      </Content>
      <BottomDiv>
        <Button title='Cancel' secondary={true} onClick={onclose} />
        <Button title='Delete' isDelete={true} />
      </BottomDiv>
    </MainDiv>
  );
}

export default DeleteModal;
