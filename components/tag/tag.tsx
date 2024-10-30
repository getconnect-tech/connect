import React from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import LabelSvgIcon from '@/assets/icons/labelIcons';
import Avatar from '../avtar/Avtar';
import { StatusDiv, StatusTitle } from './styles';

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
  isCheckbox?: boolean;
  tagIconSize?: string;
  tagIconViewBox?: string;
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
  isCheckbox,
  tagIconSize = '12',
  tagIconViewBox = '0 0 12 12',
}: Props) {
  const IconComponent = isCheckbox ? LabelSvgIcon : SVGIcon;

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
        <Avatar name={title || ''} imgSrc={src || ''} size={20} />
      ) : (
        <IconComponent
          name={iconName}
          width={tagIconSize}
          height={tagIconSize}
          className='icon'
          viewBox={tagIconViewBox}
          style={svgStyle}
        />
      )}
      {title && <StatusTitle>{title}</StatusTitle>}
    </StatusDiv>
  );
}
