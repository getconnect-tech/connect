import React from "react";
import { Div, MainDiv } from "./style";

interface Props {
  title: string;
  time: string;
}

export default function QuestionCard({ time, title }: Props) {
  return (
    <MainDiv>
      <Div>
        <p>{title}</p>
        <span>{time}</span>
      </Div>
    </MainDiv>
  );
}
