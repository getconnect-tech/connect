import React from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import LabelSvgIcon from '@/assets/icons/labelIcons';
import { IconDiv } from './style';

interface Props {
  // eslint-disable-next-line no-unused-vars
  onClick?: (e: React.SyntheticEvent) => void;
  iconName: string;
  iconSize: string;
  iconViewBox: string;
  size?: boolean;
  className?: string;
  isActive?: boolean;
  labelSvg?: boolean;
  secondaryIcon?: boolean;
  style?: React.CSSProperties;
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
  secondaryIcon,
  style,
}: Props) {
  return (
    <IconDiv
      onClick={onClick}
      size={size}
      className={className}
      isActive={isActive}
      secondaryIcon={secondaryIcon}
      style={style}
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
