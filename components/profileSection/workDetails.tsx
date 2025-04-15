import React, { useCallback, useEffect, useState } from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import { capitalizeString } from '@/helpers/common';
import Avatar from '../avtar/Avtar';
import {
  DetailsDiv,
  DetailsMainDiv,
  LeftDiv,
  NameDiv,
  Title,
  TitleDiv,
  WorkDetailMainDiv,
} from './styles';

interface Props {
  groupInfo: Group;
}

interface GroupInformation {
  label: string;
  value: string;
}

export default function WorkDetails({ groupInfo }: Props) {
  const [showDetails, setShowDetails] = useState(true);
  const [groupInformation, setGroupInformation] = useState<GroupInformation[]>(
    [],
  );

  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  const createGroupInfo = useCallback(() => {
    const groupInfoArray: GroupInformation[] = [];
    if (groupInfo?.name) {
      groupInfoArray.push({ label: 'Name', value: groupInfo.name });
    }

    if (groupInfo?.group_label) {
      groupInfoArray.push({
        label: 'Group Label',
        value: groupInfo.group_label,
      });
    }

    if (groupInfo?.traits) {
      Object.entries(groupInfo.traits).forEach(([key, value]) => {
        if (value) {
          // Convert the key to a human-readable label
          const label = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase());
          groupInfoArray.push({
            label,
            value: capitalizeString(value),
          });
        }
      });
    }

    // For created
    // if (groupInfo?.created_at) {
    //   groupInfoArray.push({
    //     label: 'Created',
    //     value: `${formatTime(groupInfo.created_at.toString())} ago`,
    //   });
    // }

    // For updated
    // if (groupInfo?.updated_at) {
    //   groupInfoArray.push({
    //     label: 'Updated',
    //     value: `${formatTime(groupInfo.updated_at.toString())} ago`,
    //   });
    // }
    setGroupInformation(groupInfoArray);
  }, [groupInfo]);

  useEffect(() => {
    createGroupInfo();
  }, [createGroupInfo, groupInfo]);

  return (
    <WorkDetailMainDiv>
      <TitleDiv onClick={toggleDetails}>
        <NameDiv>
          <Avatar
            imgSrc={
              groupInfo?.avatar
                ? groupInfo.avatar === 'undefined' ||
                  groupInfo.avatar === 'null'
                  ? ''
                  : groupInfo.avatar
                : ''
            }
            name={groupInfo?.name || ''}
            size={20}
            isShowBorder={true}
          />
          <Title>{groupInfo?.name}</Title>
        </NameDiv>
        <div className='icon'>
          <SVGIcon
            name={showDetails ? 'up-arrow-icon' : 'down-arrow-icon'}
            width='12'
            height='12'
            fill='none'
            viewBox='0 0 12 12'
          />
        </div>
      </TitleDiv>
      {showDetails && (
        <DetailsMainDiv>
          {groupInformation.map((group, index) => (
            <DetailsDiv key={index}>
              <LeftDiv>
                <p>{group?.label}</p>
              </LeftDiv>
              <p>{group?.value}</p>
            </DetailsDiv>
          ))}
        </DetailsMainDiv>
      )}
    </WorkDetailMainDiv>
  );
}
