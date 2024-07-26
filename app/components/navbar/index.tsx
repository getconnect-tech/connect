"use client";
import React, { useCallback, useState } from "react";
import {
  CountText,
  ItemDiv,
  ItemMainDiv,
  Label,
  LeftDiv,
  LogoDiv,
  MainDiv,
  Title,
  TopDiv,
} from "./style";
import SVGIcon from "@/app/assets/svg/SVGIcon";
import { colors } from "@/app/styles/colors";

function Navbar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = useCallback(
    (index: number) => {
      setActiveIndex(index === activeIndex ? null : index); // Toggle active state
    },
    [activeIndex]
  );

  return (
    <MainDiv>
      <TopDiv>
        <LogoDiv>
          <SVGIcon
            name="logo-icon"
            width="101"
            height="28"
            viewBox="0 0 101 28"
            fill="none"
            className="logo-icon"
          />
          <SVGIcon
            name="sidebar-icon"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className="logo-icon"
          />
        </LogoDiv>
        <ItemDiv isActive={activeIndex === 0} onClick={() => handleClick(0)}>
          <LeftDiv>
            <SVGIcon
              name="started-icon"
              width="12"
              height="12"
              fill={activeIndex === 0 ? colors.icon_hover : colors.icon}
              viewBox="0 0 12 12"
            />
            <Title isActive={activeIndex === 0}>Getting started</Title>
          </LeftDiv>
        </ItemDiv>
        <ItemMainDiv>
          <ItemDiv isActive={activeIndex === 1} onClick={() => handleClick(1)}>
            <LeftDiv>
              <SVGIcon
                name="inbox-icon"
                width="12"
                height="12"
                fill={activeIndex === 1 ? colors.icon_hover : colors.icon}
                viewBox="0 0 12 12"
              />
              <Title isActive={activeIndex === 1}>Inbox</Title>
            </LeftDiv>
            <CountText>4</CountText>
          </ItemDiv>
          <ItemDiv isActive={activeIndex === 2} onClick={() => handleClick(2)}>
            <LeftDiv>
              <SVGIcon
                name="inbox-icon"
                width="12"
                height="12"
                fill={activeIndex === 2 ? colors.icon_hover : colors.icon}
                viewBox="0 0 12 12"
              />
              <Title isActive={activeIndex === 2}>Unassigned</Title>
            </LeftDiv>
          </ItemDiv>
          <ItemDiv isActive={activeIndex === 3} onClick={() => handleClick(3)}>
            <LeftDiv>
              <SVGIcon
                name="inbox-icon"
                width="12"
                height="12"
                fill={activeIndex === 3 ? colors.icon_hover : colors.icon}
                viewBox="0 0 12 12"
              />
              <Title isActive={activeIndex === 3}>All</Title>
            </LeftDiv>
          </ItemDiv>
        </ItemMainDiv>
        <ItemMainDiv>
          <ItemDiv isActive={activeIndex === 4} onClick={() => handleClick(4)}>
            <LeftDiv>
              <SVGIcon
                name="inbox-icon"
                width="12"
                height="12"
                fill={activeIndex === 4 ? colors.icon_hover : colors.icon}
                viewBox="0 0 12 12"
              />
              <Title isActive={activeIndex === 4}>Contacts</Title>
            </LeftDiv>
          </ItemDiv>
          <ItemDiv isActive={activeIndex === 5} onClick={() => handleClick(5)}>
            <LeftDiv>
              <SVGIcon
                name="inbox-icon"
                width="12"
                height="12"
                fill={activeIndex === 5 ? colors.icon_hover : colors.icon}
                viewBox="0 0 12 12"
              />
              <Title isActive={activeIndex === 5}>Insights</Title>
            </LeftDiv>
          </ItemDiv>
        </ItemMainDiv>
        <ItemMainDiv>
          <Label>Label</Label>
          <ItemDiv isActive={activeIndex === 6} onClick={() => handleClick(6)}>
            <LeftDiv>
              <SVGIcon
                name="inbox-icon"
                width="12"
                height="12"
                fill={activeIndex === 6 ? colors.icon_hover : colors.icon}
                viewBox="0 0 12 12"
              />
              <Title isActive={activeIndex === 6}>Bug</Title>
            </LeftDiv>
          </ItemDiv>
          <ItemDiv isActive={activeIndex === 7} onClick={() => handleClick(7)}>
            <LeftDiv>
              <SVGIcon
                name="inbox-icon"
                width="12"
                height="12"
                fill={activeIndex === 7 ? colors.icon_hover : colors.icon}
                viewBox="0 0 12 12"
              />
              <Title isActive={activeIndex === 7}>Question</Title>
            </LeftDiv>
          </ItemDiv>
          <ItemDiv isActive={activeIndex === 8} onClick={() => handleClick(8)}>
            <LeftDiv>
              <SVGIcon
                name="inbox-icon"
                width="12"
                height="12"
                fill={activeIndex === 8 ? colors.icon_hover : colors.icon}
                viewBox="0 0 12 12"
              />
              <Title isActive={activeIndex === 8}>Feedback</Title>
            </LeftDiv>
          </ItemDiv>
        </ItemMainDiv>
      </TopDiv>
      <ItemDiv isActive={activeIndex === 9} onClick={() => handleClick(9)}>
        <LeftDiv>
          <SVGIcon
            name="started-icon"
            width="12"
            height="12"
            fill={activeIndex === 9 ? colors.icon_hover : colors.icon}
            viewBox="0 0 12 12"
          />
          <Title isActive={activeIndex === 9}>Support</Title>
        </LeftDiv>
      </ItemDiv>
    </MainDiv>
  );
}

export default Navbar;
