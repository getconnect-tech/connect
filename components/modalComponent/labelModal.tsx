import React, { ChangeEvent, useCallback, useState } from 'react';
import { Label as PrismaLabel } from '@prisma/client';
import { observer } from 'mobx-react-lite';
import LabelSvgIcon from '@/assets/icons/labelIcons';
import {
  createLabel,
  updateLabelDetails,
} from '@/services/clientSide/settingServices';
import { useStores } from '@/stores';
import Button from '../button/button';
import Input from '../input/input';
import LabelIconDropdown from '../labelIcoDropdown/labelIconDropdown';
import { BottomDiv, Header, IconDiv, Label, MainDiv } from './style';

interface Props {
  onClose: () => void;
  labelData?: PrismaLabel;
}
const LabelModal = ({ onClose, labelData }: Props) => {
  const { settingStore } = useStores();
  const { loading } = settingStore;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [icon, setIcon] = useState<string>(labelData?.icon || 'tag-icon');
  const [labelName, setLabelName] = useState<string>(labelData?.name || '');
  const handleLabelName = (iconName: string) => {
    setIcon(iconName);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Create new label and update label
  const handleLabelSubmit = useCallback(
    async (e: React.SyntheticEvent, icon: string, name: string) => {
      e.preventDefault();
      const payload = { icon, name, color: 'var(--border-selected)' };
      settingStore.setLoading(true);
      try {
        if (labelData) {
          const result = await updateLabelDetails(labelData?.id, payload);
          if (result) {
            settingStore.updateLabel(labelData?.id, result);
          }
        } else {
          const result = await createLabel(payload);
          if (result) {
            settingStore.addLabel(result);
          }
        }
      } catch (e) {
        console.log('Error : ', e);
      } finally {
        settingStore.setLoading(false);
        onClose();
      }
    },
    [],
  );

  return (
    <MainDiv>
      <Header>{labelData ? 'Update label' : 'Create new label'}</Header>
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
          <Button
            type='submit'
            title={labelData ? 'Update' : 'Create'}
            variant='medium'
            isLoading={loading}
          />
        </div>
      </BottomDiv>
    </MainDiv>
  );
};

export default observer(LabelModal);
