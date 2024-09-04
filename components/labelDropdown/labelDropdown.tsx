import React from 'react';
import { Label } from '@prisma/client';
import DropDown from '../dropDown/dropDown';
import { StatusDiv, StatusTitle } from './style';
import LabelSvgIcon from '@/assets/icons/labelIcons';
import { HandleClickProps } from '@/utils/appTypes';
import { useStores } from '@/stores';

interface IconTitlePair {
  iconName: string;
  title: string;
}

interface Props {
  ref?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  // eslint-disable-next-line no-unused-vars
  handleClick: (props: HandleClickProps) => void;
  iconTitlePairs: IconTitlePair[]; // Updated to accept an array of icon-title pairs
  onClick: () => void;
  dropDown: boolean;
  onClose: () => void;
  className?: string;
  ticketLabelData?: Label[];
  onMouseEnter: any;
}

function LabelDropdown({
  ref,
  style,
  handleClick,
  iconTitlePairs, // Updated to use the array of icon-title pairs
  dropDown,
  onClick,
  onClose,
  className,
  ticketLabelData,
  onMouseEnter,
}: Props) {
  const { settingStore } = useStores();
  const { labels } = settingStore || {};

  const labelItem = (labels || [])?.map((label) => ({
    labelId: label.id,
    name: label.name,
    icon: label.icon,
  }));

  return (
    <div onMouseEnter={onMouseEnter}>
      <StatusDiv
        onClick={(e) => {
          onClick();
          e.stopPropagation();
        }}
        ref={ref}
        className='tag-div'
        style={style}
        isActive={true}
        hasIconTitlePairs={iconTitlePairs?.length > 0}
      >
        {!iconTitlePairs || iconTitlePairs?.length === 0 ? (
          <LabelSvgIcon
            name={'tag-icon'}
            width='12'
            height='12'
            viewBox='0 0 16 16'
            className='tag-icon'
          />
        ) : (
          iconTitlePairs.map((item, index) => (
            <React.Fragment key={index}>
              <LabelSvgIcon
                name={item.iconName}
                width='12'
                height='12'
                className='icon'
                viewBox='0 0 16 16'
              />
              <StatusTitle>{item.title}</StatusTitle>
              <div className='line' />
            </React.Fragment>
          ))
        )}
      </StatusDiv>
      {dropDown && (
        <DropDown
          items={labelItem}
          iconSize={'12'}
          iconViewBox={'0 0 16 16'}
          onClose={onClose}
          handleClick={handleClick}
          isCheckbox={true}
          className={className}
          ticketLabelData={ticketLabelData}
          isSearch={true}
        />
      )}
    </div>
  );
}

export default LabelDropdown;
