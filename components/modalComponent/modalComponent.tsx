import React, { useState } from 'react';
import Icon from '../icon/icon';
import Input from '../input/input';
import Button from '../button/button';
import LabelIconDropdown from '../labelIcoDropdown/labelIconDropdown';
import { BottomDiv, Header, IconDiv, Label, MainDiv, Title } from './style';
import LabelSvgIcon from '@/assets/icons/labelIcons';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  onChange?: any;
  value?: any;
  value2?: any;
  onChange2?: any;
  loading: boolean;
  buttonTitle: string;
  buttonCancel?: string;
  title: string;
  inputFirstLabel: string;
  inputSecondLabel?: string;
  firstPlaceholder?: string;
  secondPlaceholder?: string;
  isIcon?: boolean;
  span?: string;
  isDropdown?: boolean;
  onDropdownClick?: () => void;
  dropdownVisible?: boolean;
}

function ModalComponent({
  onClose,
  onSubmit,
  onChange,
  value,
  value2,
  onChange2,
  loading,
  buttonTitle,
  buttonCancel,
  title,
  inputFirstLabel,
  inputSecondLabel,
  isIcon = true,
  firstPlaceholder = '',
  secondPlaceholder = '',
  span,
  isDropdown = false,
  onDropdownClick,
  dropdownVisible,
}: Props) {
  const [icon, setIcon] = useState<string>('tag-icon');
  const handleLableName = (iconName: string) => {
    setIcon(iconName);
  };
  return (
    <MainDiv>
      <Header>
        <Title>{title}</Title>
        {isIcon && (
          <Icon
            iconName='cross-icon'
            iconSize='12'
            iconViewBox='0 0 16 16'
            onClick={onClose}
          />
        )}
      </Header>
      <BottomDiv onSubmit={onSubmit}>
        {isDropdown && (
          <div className='label-dropdown'>
            <IconDiv onClick={onDropdownClick}>
              <LabelSvgIcon
                name={icon}
                width='16'
                height='16'
                viewBox='0 0 20 20'
              />
            </IconDiv>
            {dropdownVisible && (
              <LabelIconDropdown handleLableName={handleLableName} />
            )}
          </div>
        )}
        <Label>
          {inputFirstLabel} <span>{span}</span>
        </Label>
        <Input
          value={value}
          onChange={onChange}
          placeholder={firstPlaceholder}
        />
        {inputSecondLabel && (
          <>
            <Label className='email-label'>{inputSecondLabel}</Label>
            <Input
              value={value2}
              onChange={onChange2}
              placeholder={secondPlaceholder}
            />
          </>
        )}
        <div className='button'>
          {buttonCancel && (
            <Button
              title={buttonCancel}
              onClick={onClose}
              secondary={true}
              variant='medium'
            />
          )}
          <Button
            type='submit'
            title={buttonTitle}
            isLoading={loading}
            variant='medium'
          />
        </div>
      </BottomDiv>
    </MainDiv>
  );
}

export default ModalComponent;
