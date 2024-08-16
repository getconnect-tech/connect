import React from 'react';
import Input from '../input/input';
import Icon from '../icon/icon';
import { Icons, MainDiv, SearchDiv } from './style';
import { labelIcons } from '@/helpers/raw';

function LabelIconDropdown() {
  return (
    <MainDiv>
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
            onClick={() => {}}
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
