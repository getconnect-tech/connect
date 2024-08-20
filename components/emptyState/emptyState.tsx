import React from 'react';
import Button from '../button/button';
import { IconDiv, MainDiv } from './style';
import SVGIcon from '@/assets/icons/SVGIcon';

interface Props {
  iconName: string;
  iconSize: string;
  iconViewBox: string;
  title: string;
  description?: string;
  buttonTitle?: string;
  onClick?: () => void;
  className?: string;
}

function EmptyState({
  iconName,
  iconSize,
  iconViewBox,
  title,
  description,
  buttonTitle,
  onClick,
  className,
}: Props) {
  return (
    <MainDiv className={className}>
      <IconDiv>
        <SVGIcon
          name={iconName}
          width={iconSize}
          height={iconSize}
          viewBox={iconViewBox}
        />
      </IconDiv>
      <div>
        <h6>{title}</h6>
        {description && <p>{description}</p>}
      </div>
      {buttonTitle && <Button title={buttonTitle} onClick={onClick} />}
    </MainDiv>
  );
}

export default EmptyState;
