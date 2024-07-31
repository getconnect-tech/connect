import React from "react";
import {
  CardMessage,
  CardTop,
  MessageCardInnerDiv,
  MessageCardMinDiv,
  NameDiv,
  NameTitle,
} from "./style";
import SVGIcon from "@/assets/icons/SVGIcon";

interface Props {
  title: string;
  time: string;
  subTitle: string;
  message: string;
}

export default function MessageCard({ title, time, subTitle, message }: Props) {
  return (
    <MessageCardMinDiv>
      <MessageCardInnerDiv>
        <CardTop>
          <NameDiv>
            <NameTitle>{title}</NameTitle>
            <SVGIcon
              name="dot-icon"
              width="4"
              height="4"
              fill="none"
              viewBox="0 0 4 4"
            />
            <span>{time}</span>
          </NameDiv>
          <p>{subTitle}</p>
        </CardTop>
        <CardMessage>{message}</CardMessage>
      </MessageCardInnerDiv>
    </MessageCardMinDiv>
  );
}
