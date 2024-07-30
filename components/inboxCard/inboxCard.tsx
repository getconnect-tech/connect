import React, { useState } from "react";
import {
  CardDiv,
  DesTitle,
  DotIcon,
  LeftDiv,
  NameText,
  RightDiv,
  StatusMainDiv,
} from "./style";
import Avatar from "../avtar/Avtar";
import { useRouter } from "next/navigation";
import Tag from "../tag/tag";

interface Status {
  title: string;
  isName: boolean;
  iconName?: string;
  avatarUrl?: string;
}

interface Props {
  name: string;
  title: string;
  description: string;
  time: string;
  showDotIcon?: boolean;
  src: string;
  status: Status[];
}

export default function InboxCard({
  name,
  title,
  description,
  time,
  showDotIcon = false,
  status,
  src,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleDivClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <CardDiv
      onClick={() => {
        router.push("/details");
      }}
    >
      {showDotIcon && <DotIcon />}
      <LeftDiv>
        <Avatar size={28} imgSrc={src} name={""} isShowBorder={true} />
        <RightDiv>
          <NameText>{name}</NameText>
          <DesTitle>{title}</DesTitle>
          <NameText className="description">{description}</NameText>
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
      <NameText>{time}</NameText>
    </CardDiv>
  );
}
