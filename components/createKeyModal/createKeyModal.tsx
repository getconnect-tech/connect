import React from 'react';
import Icon from '../icon/icon';
import Input from '../input/input';
import Button from '../button/button';
import { BottomDiv, Header, Label, MainDiv, Title } from './style';

interface Props {
  onClose: () => void;
}

function CreateKeyModal({ onClose }: Props) {
  return (
    <MainDiv>
      <Header>
        <Title>Create API key</Title>
        <Icon
          iconName='cross-icon'
          iconSize='12'
          iconViewBox='0 0 16 16'
          onClick={onClose}
        />
      </Header>
      <BottomDiv>
        <Label>
          Name <span>(This is just for your reference)</span>
        </Label>
        <Input placeholder={'Enter your key name'} className='input' />
        <div className='button'>
          <Button type='submit' title='Cancel' secondary={true} />
          <Button type='submit' title='Create' />
        </div>
      </BottomDiv>
    </MainDiv>
  );
}

export default CreateKeyModal;
