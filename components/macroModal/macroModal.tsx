import React from 'react';
import Input from '../input/input';
import RichTextBox from '../commentBox';
import Button from '../button/button';
import {
  BottomDiv,
  ContentDiv,
  Header,
  Label,
  MainDiv,
  TextField,
} from './style';

interface Props {
  onClose: () => void;
}
function MacroModal({ onClose }: Props) {
  return (
    <MainDiv>
      <Header>Edit Macro</Header>
      <ContentDiv>
        <TextField>
          <Label>Title</Label>
          <Input placeholder={'Enter the title'} className='input' />
        </TextField>
        <TextField>
          <Label>Description</Label>
          <RichTextBox
            isApplyMaxHeight={412}
            isApplyMinHeight={412}
            isInlineToolbar={false}
            className='rich-text'
          />
        </TextField>
      </ContentDiv>
      <BottomDiv>
        <Button
          title='Cancel'
          secondary={true}
          onClick={onClose}
          variant='medium'
        />
        <Button title='Save' variant='medium' />
      </BottomDiv>
    </MainDiv>
  );
}

export default MacroModal;
