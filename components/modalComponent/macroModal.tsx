import React, { ChangeEvent, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/stores';
import {
  createMacros,
  updateMacros,
} from '@/services/clientSide/settingServices';
import { messageStore } from '@/stores/messageStore';
import { isEmpty } from '@/helpers/common';
import Input from '../input/input';
import Button from '../button/button';
import ProsemirrorEditor from '../prosemirror';
import { BottomDiv, Header, Label, MainDiv } from './style';

interface MacroData {
  id: string;
  title: string;
  description: string;
}
interface Props {
  onClose: () => void;
  macroData?: MacroData;
}
function MacroModal({ onClose, macroData }: Props) {
  // Create new label and update label
  const { settingStore } = useStores();
  const { loading } = settingStore || {};
  const [title, setTitle] = useState<string>(macroData?.title || '');
  const [description, setDescription] = useState<string>(
    macroData?.description || '',
  );
  const handleMacrosSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (description.trim() === '' || title.trim() === '') {
        messageStore.setErrorMessage(
          'Both title and description are required.',
        );
        return;
      }
      const payload = { content: description, title };
      try {
        if (macroData) {
          // Update existing macro
          const result = await updateMacros(macroData?.id, payload);
          if (result) {
            settingStore.updateMacros(macroData?.id, result);
          }
        } else {
          // Create new macro
          const result = await createMacros(payload);
          if (result) {
            settingStore.addMacros(result);
          }
        }
      } catch (e) {
        console.log('Error : ', e);
      } finally {
        onClose();
      }
    },
    [description, title, macroData, settingStore, onClose],
  );

  return (
    <MainDiv className='macro-main-div'>
      <Header>{isEmpty(title) ? 'Add Macro' : 'Edit Macro'}</Header>
      <BottomDiv onSubmit={handleMacrosSubmit}>
        <div className='content'>
          <div>
            <Label>Title</Label>
            <Input
              placeholder={'Enter the title'}
              className='input'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              value={title}
            />
          </div>
          <div className='text-field'>
            <Label>Description</Label>
            <ProsemirrorEditor
              valueContent={description}
              setValueContent={setDescription}
              className='prosemirror'
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
          <Button title='Save' variant='medium' isLoading={loading} />
        </div>
      </BottomDiv>
    </MainDiv>
  );
}

export default observer(MacroModal);
