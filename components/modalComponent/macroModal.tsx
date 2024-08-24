import React from 'react';
import Input from '../input/input';
import RichTextBox from '../commentBox';
import Button from '../button/button';
import { BottomDiv, Header, Label, MainDiv } from './style';

interface Props {
  onClose: () => void;
}
function MacroModal({ onClose }: Props) {
  return (
    <MainDiv className='macro-main-div'>
      <Header>Edit Macro</Header>
      <BottomDiv>
        <div className='content'>
          <div>
            <Label>Title</Label>
            <Input placeholder={'Enter the title'} className='input' />
          </div>
          <div className='text-field'>
            <Label>Description</Label>
            <RichTextBox
              isApplyMaxHeight={412}
              isApplyMinHeight={412}
              isInlineToolbar={false}
              className='rich-text'
              placeholder='Enter description'
            />
          </div>
        </div>
        <div className='button'>
          <Button
            title='Cancel'
            secondary={true}
            onClick={onClose}
            variant='medium'
          />
          <Button title='Save' variant='medium' />
        </div>
      </BottomDiv>
    </MainDiv>
  );
}

export default MacroModal;
