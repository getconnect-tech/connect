import React, { useState } from "react";
import {
  CardDiv,
  DesTitle,
  DotIcon,
  LeftDiv,
  NameText,
  RightDiv,
  StatusDiv,
  StatusMainDiv,
  StatusTitle,
} from "./style";
import Avatar from "../avtar/Avtar";
import SVGIcon from "@/app/assets/svg/SVGIcon";

interface Props {
  name: string;
  title: string;
  description: string;
  time: string;
  showDotIcon?: boolean;
}

export default function InboxCard({
  name,
  title,
  description,
  time,
  showDotIcon = false,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleDivClick = (index: number) => {
    setActiveIndex(index);
  };
  const statuses = [
    { title: "Question", isName: false },
    { title: "Priority", isName: false },
    {
      title: "Sanjay M.",
      isName: true,
      avatarUrl:
        "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4",
    },
    // Add more statuses as needed
  ];

  return (
    <CardDiv>
      {showDotIcon && <DotIcon />}
      <LeftDiv>
        <Avatar
          size={28}
          imgSrc={
            "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4"
          }
          name={""}
          isShowBorder={true}
        />
        <RightDiv>
          <NameText>{name}</NameText>
          <DesTitle>{title}</DesTitle>
          <NameText className="description">{description}</NameText>
          <StatusMainDiv>
            {statuses.map((status, index) => (
              <StatusDiv
                key={index}
                isActive={activeIndex === index}
                onClick={() => handleDivClick(index)}
              >
                {status.isName ? (
                  <Avatar name="" imgSrc={`${status.avatarUrl}`} size={20} />
                ) : (
                  <SVGIcon
                    name="inbox-icon"
                    width="12"
                    height="12"
                    className="icon"
                    viewBox="0 0 12 12"
                  />
                )}
                <StatusTitle>{status.title}</StatusTitle>
              </StatusDiv>
            ))}
          </StatusMainDiv>
        </RightDiv>
      </LeftDiv>
      <NameText>{time}</NameText>
    </CardDiv>
  );
}
