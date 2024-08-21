import React, { useEffect, useRef, useState } from 'react';
import Input from '../input/input';
import Icon from '../icon/icon';
import { Icons, MainDiv, SearchDiv } from './style';
import { labelIcons } from '@/helpers/raw';

interface Props {
  onClose?: () => void;
}
function LabelIconDropdown({ onClose }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        if (onClose) {
          onClose();
        }
      }
    }

    // eslint-disable-next-line no-undef
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // eslint-disable-next-line no-undef
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, onClose]);

  if (!isOpen) return null;

  return (
    <MainDiv ref={dropdownRef}>
      <SearchDiv>
        <Input
          placeholder='Search'
          autoFocus={true}
          iconName='search-icon'
          iconSize='12'
          iconViewBox='0 0 12 12'
          isIcon={true}
          className='input'
        />
      </SearchDiv>
      <Icons>
        {labelIcons.map((icon, index) => (
          <Icon
            key={index}
            onClick={() => {
              setIsOpen(false);
            }}
            iconName={icon.iconName}
            iconSize={'12'}
            iconViewBox={'0 0 12 12'}
            labelSvg={true}
            size={true}
          />
        ))}
      </Icons>
    </MainDiv>
  );
}

export default LabelIconDropdown;
