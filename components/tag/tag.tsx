import React from "react";
import Avatar from "../avtar/Avtar";
import SVGIcon from "@/assets/icons/SVGIcon";
import { StatusDiv, StatusTitle } from "./styles";

interface Props {
  isActive: boolean;
  onClick: () => void;
  isName: boolean;
  src?: string;
  iconName: string;
  title: string;
  ref?: React.Ref<HTMLDivElement>;
}

export default function Tag({
  isActive,
  onClick,
  isName,
  src,
  iconName,
  title,
  ref,
}: Props) {
  return (
    //apply className while open drop down
    <StatusDiv
      isActive={isActive}
      onClick={onClick}
      ref={ref}
      className="tag-div"
    >
      {isName ? (
        <Avatar name="" imgSrc={`${src}`} size={20} />
      ) : (
        <SVGIcon
          name={iconName}
          width="12"
          height="12"
          className="icon"
          viewBox="0 0 12 12"
        />
      )}
      <StatusTitle>{title}</StatusTitle>
    </StatusDiv>
  );
}
