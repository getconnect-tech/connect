import React from 'react';
import { IconDiv } from './style';
import SVGIcon from '@/assets/icons/SVGIcon';
import LabelSvgIcon from '@/assets/icons/labelIcons';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onClick: (e: React.SyntheticEvent) => void;
  iconName: string;
  iconSize: string;
  iconViewBox: string;
  size?: boolean;
  className?: string;
  isActive?: boolean;
  labelSvg?: boolean;
}

function Icon({
  onClick,
  iconName,
  iconSize,
  iconViewBox,
  size,
  className,
  isActive = false,
  labelSvg = false,
}: Props) {
  return (
    <IconDiv
      onClick={onClick}
      size={size}
      className={className}
      isActive={isActive}
    >
      {labelSvg ? (
        <LabelSvgIcon
          name={iconName}
          width={iconSize}
          height={iconSize}
          viewBox={iconViewBox}
        />
      ) : (
        <SVGIcon
          name={iconName}
          width={iconSize}
          height={iconSize}
          viewBox={iconViewBox}
        />
      )}
    </IconDiv>
  );
}

export default Icon;
