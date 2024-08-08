import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Ticket } from '@prisma/client';
import moment from 'moment';
import Avatar from '../avtar/Avtar';
import Tag from '../tag/tag';
import {
  CardDiv,
  DesTitle,
  DotIcon,
  LeftDiv,
  NameText,
  RightDiv,
  StatusMainDiv,
} from './style';
import { capitalizeString } from '@/helpers/common';

interface Status {
  title: string;
  isName: boolean;
  iconName?: string;
  avatarUrl?: string;
}

interface Props {
  ticketDetail: Ticket;
  description: string;
  showDotIcon?: boolean;
  src: string;
  status: Status[];
}

export default function InboxCard({
  ticketDetail,
  description,
  showDotIcon = false,
  status,
  src,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { title, created_at, sender_name, source } = ticketDetail;
  const router = useRouter();

  const handleDivClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <CardDiv
      onClick={() => {
        router.push('/details');
      }}
    >
      {showDotIcon && <DotIcon />}
      <LeftDiv>
        <Avatar size={28} imgSrc={src} name={sender_name} isShowBorder={true} />
        <RightDiv>
          <NameText>
            {sender_name} from {capitalizeString(source)}
          </NameText>
          <DesTitle>{title}</DesTitle>
          <NameText className='description'>{description}</NameText>
          <StatusMainDiv>
            {status.map((status, index) => (
              <>
                <Tag
                  isActive={activeIndex === index}
                  onClick={() => handleDivClick(index)}
                  isName={status.isName}
                  iconName={`${status.iconName}`}
                  title={`${status.title}`}
                  src={`${status.avatarUrl}`}
                />
              </>
            ))}
          </StatusMainDiv>
        </RightDiv>
      </LeftDiv>
      <NameText>{moment(created_at).fromNow()}</NameText>
    </CardDiv>
  );
}
