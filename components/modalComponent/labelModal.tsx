import React, { useState } from 'react';
import Button from '../button/button';
import Input from '../input/input';
import LabelIconDropdown from '../labelIcoDropdown/labelIconDropdown';
import { BottomDiv, Header, IconDiv, Label, MainDiv } from './style';
import LabelSvgIcon from '@/assets/icons/labelIcons';

interface Props {
  onClose: () => void;
}
function LabelModal({ onClose }: Props) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [icon, setIcon] = useState<string>('tag-icon');
  const handleLabelName = (iconName: string) => {
    setIcon(iconName);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <MainDiv>
      <Header>Create new label</Header>
      <BottomDiv>
        <div className='icon-div'>
          <IconDiv onClick={toggleDropdown}>
            <LabelSvgIcon
              name={icon}
              width='16'
              height='16'
              viewBox='0 0 16 16'
            />
          </IconDiv>
          {dropdownVisible && (
            <LabelIconDropdown handleLabelName={handleLabelName} />
          )}
        </div>
        <Label>Label Name</Label>
        <Input placeholder={'Enter label Name'} />
        <div className='button'>
          <Button
            type='submit'
            title='Cancel'
            secondary={true}
            onClick={onClose}
            variant='medium'
          />
          <Button type='submit' title='Create' variant='medium' />
        </div>
      </BottomDiv>
    </MainDiv>
  );
}

export default LabelModal;
