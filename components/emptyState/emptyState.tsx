import React from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import Button from '../button/button';
import { IconDiv, MainDiv } from './style';

interface Props {
  iconName: string;
  iconSize: string;
  iconViewBox: string;
  title: string;
  description?: string;
  buttonTitle?: string;
  onClick?: () => void;
  className?: string;
  buttonIconViewBox?: string;
  buttonIconName?: string;
  buttonIconSize?: string;
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
  buttonIconName,
  buttonIconSize,
  buttonIconViewBox,
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
      {buttonTitle && (
        <Button
          title={buttonTitle}
          onClick={onClick}
          iconName={buttonIconName}
          iconSize={buttonIconSize}
          iconViewBox={buttonIconViewBox}
          variant='medium'
        />
      )}
    </MainDiv>
  );
}

export default EmptyState;
