'use client';
import React from 'react';
import LabelSvgIcon from '@/assets/icons/labelIcons';
import SVGIcon from '@/assets/icons/SVGIcon';
import { CountText, ItemDiv, LeftDiv, Title } from './style';

interface Props {
  title: string;
  count?: number;
  icon: string;
  isActive?: boolean;
  onClickItem: () => void;
  label?: boolean;
}

function NavbarItem(props: Props) {
  const { title, isActive, count, icon, onClickItem, label } = props;
  const IconComponent = label ? LabelSvgIcon : SVGIcon;

  return (
    <ItemDiv isActive={isActive} onClick={onClickItem}>
      <LeftDiv isActive={isActive}>
        <IconComponent
          name={icon}
          width='12'
          height='12'
          viewBox={label ? '0 0 16 16' : '0 0 12 12'}
        />
        <Title isActive={isActive}>{title}</Title>
      </LeftDiv>
      {count !== undefined && count > 0 && <CountText>{count}</CountText>}
    </ItemDiv>
  );
}

export default NavbarItem;
