import React, { ChangeEvent, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '../button/button';
import Input from '../input/input';
import LabelIconDropdown from '../labelIcoDropdown/labelIconDropdown';
import { BottomDiv, Header, IconDiv, Label, MainDiv } from './style';
import LabelSvgIcon from '@/assets/icons/labelIcons';
import { createLabel } from '@/services/clientSide/settingServices';
import { useStores } from '@/stores';

interface Props {
  onClose: () => void;
}
const LabelModal = ({ onClose }: Props) => {
  const { settingStore } = useStores();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [icon, setIcon] = useState<string>('tag-icon');
  const [labelName, setLabelName] = useState<string>('');

  const handleLabelName = (iconName: string) => {
    setIcon(iconName);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Create new label
  const handleLabelSubmit = useCallback(
    async (e: React.SyntheticEvent, icon: string, name: string) => {
      e.preventDefault();
      const payload = { icon, name, color: '#7B7A79' };
      try {
        const result = await createLabel(payload);
        if (result) {
          settingStore.addLabel(result);
        }
      } catch (e) {
        console.log('Error : ', e);
      } finally {
        onClose();
      }
    },
    [],
  );

  return (
    <MainDiv>
      <Header>Create new label</Header>
      <BottomDiv
        onSubmit={(e: React.SyntheticEvent) =>
          handleLabelSubmit(e, icon, labelName)
        }
      >
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
        <Input
          placeholder={'Enter label Name'}
          value={labelName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setLabelName(e.target.value)
          }
        />
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
};

export default observer(LabelModal);
