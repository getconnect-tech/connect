import React from 'react';
import Avatar from '../avtar/Avtar';
import { StatusDiv, StatusTitle } from './styles';
import SVGIcon from '@/assets/icons/SVGIcon';

interface Props {
  isActive: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick: (e: any) => void;
  isName: boolean;
  src?: string;
  iconName: string;
  title: string;
  ref?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
}

export default function Tag({
  isActive,
  onClick,
  isName,
  iconName,
  title,
  ref,
  style,
  src,
}: Props) {
  return (
    //apply className while open drop down
    <StatusDiv
      isActive={isActive}
      onClick={onClick}
      ref={ref}
      className='tag-div'
      style={style}
    >
      {isName ? (
        <Avatar name={title} imgSrc={src || ''} size={20} />
      ) : (
        <SVGIcon
          name={iconName}
          width='12'
          height='12'
          className='icon'
          viewBox='0 0 12 12'
        />
      )}
      <StatusTitle>{title}</StatusTitle>
    </StatusDiv>
  );
}
