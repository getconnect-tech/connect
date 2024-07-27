"use client";
import React, { useCallback, useState } from "react";
import {
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
import NavbarItem from "./navbarItem";

function Navbar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

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
        <NavbarItem
          title="Getting started"
          icon="started-icon"
          isActive={activeIndex === 0}
          onClickItem={() => handleClick(0)}
        />
        <ItemMainDiv>
          <NavbarItem
            title="Inbox"
            count={4}
            icon="inbox-icon"
            isActive={activeIndex === 1}
            onClickItem={() => handleClick(1)}
          />
          <NavbarItem
            title="Unassigned"
            icon="inbox-icon"
            isActive={activeIndex === 2}
            onClickItem={() => handleClick(2)}
          />
          <NavbarItem
            title="All"
            icon="inbox-icon"
            isActive={activeIndex === 3}
            onClickItem={() => handleClick(3)}
          />
        </ItemMainDiv>
        <ItemMainDiv>
          <NavbarItem
            title="Contacts"
            icon="inbox-icon"
            isActive={activeIndex === 4}
            onClickItem={() => handleClick(4)}
          />
          <NavbarItem
            title="Insights"
            icon="inbox-icon"
            isActive={activeIndex === 5}
            onClickItem={() => handleClick(5)}
          />
        </ItemMainDiv>
        <ItemMainDiv>
          <Label>Label</Label>
          <NavbarItem
            title="Bug"
            icon="inbox-icon"
            isActive={activeIndex === 6}
            onClickItem={() => handleClick(6)}
          />
          <NavbarItem
            title="Question"
            icon="inbox-icon"
            isActive={activeIndex === 7}
            onClickItem={() => handleClick(7)}
          />
          <NavbarItem
            title="Feedback"
            icon="inbox-icon"
            isActive={activeIndex === 8}
            onClickItem={() => handleClick(8)}
          />
        </ItemMainDiv>
      </TopDiv>
      <NavbarItem
        title="Support"
        icon="started-icon"
        isActive={activeIndex === 9}
        onClickItem={() => handleClick(9)}
      />
    </MainDiv>
  );
}

export default Navbar;
