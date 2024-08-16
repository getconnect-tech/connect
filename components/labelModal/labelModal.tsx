import React, { useState } from 'react';
import Input from '../input/input';
import Button from '../button/button';
import LabelIconDropdown from '../labelIcoDropdown/labelIconDropdown';
import {
  ButtonDiv,
  Content,
  IconDiv,
  InputField,
  Label,
  MainDiv,
  ModalHeader,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';

interface Props {
  onClose: () => void;
}
function LabelModal({ onClose }: Props) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <MainDiv>
      <ModalHeader>Create new label</ModalHeader>
      <Content>
        <div>
          <IconDiv onClick={toggleDropdown}>
            <SVGIcon
              name='label-icon'
              width='16'
              height='16'
              viewBox='0 0 20 20'
            />
          </IconDiv>
          {dropdownVisible && <LabelIconDropdown />}
        </div>
        <InputField>
          <Label>Label Name</Label>
          <Input placeholder={'Enter label Name'} />
        </InputField>
      </Content>
      <ButtonDiv>
        <Button title='Cancel' secondary onClick={onClose} />
        <Button title='Create' />
      </ButtonDiv>
    </MainDiv>
  );
}

export default LabelModal;
