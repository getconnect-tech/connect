import React from 'react';
import Icon from '../icon/icon';
import Input from '../input/input';
import Button from '../button/button';
import { BottomDiv, Header, Label, MainDiv, Title } from './style';

interface Props {
  onClose: () => void;
}

function InviteMemberModal({ onClose }: Props) {
  return (
    <MainDiv>
      <Header>
        <Title>Invite Member</Title>
        <Icon
          iconName='cross-icon'
          iconSize='12'
          iconViewBox='0 0 16 16'
          onClick={onClose}
        />
      </Header>
      <BottomDiv>
        <Label>Name</Label>
        <Input placeholder={'Enter name'} />
        <Label className='email-label'>Email</Label>
        <Input placeholder={'Enter email address'} />
        <div className='button'>
          <Button title='Invite' />
        </div>
      </BottomDiv>
    </MainDiv>
  );
}

export default InviteMemberModal;
