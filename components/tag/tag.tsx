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
  title: string | undefined;
  ref?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  svgStyle?: React.CSSProperties;
  isEmail?: boolean;
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
  svgStyle,
  isEmail,
}: Props) {
  return (
    //apply className while open drop down
    <StatusDiv
      isActive={isActive}
      onClick={onClick}
      ref={ref}
      className='tag-div'
      style={style}
      isEmail={isEmail}
    >
      {isName ? (
        <Avatar name={title || ''} imgSrc={src || ''} size={20} />
      ) : (
        <SVGIcon
          name={iconName}
          width='12'
          height='12'
          className='icon'
          viewBox='0 0 12 12'
          style={svgStyle}
        />
      )}
      {title && <StatusTitle>{title}</StatusTitle>}
    </StatusDiv>
  );
}
