"use client";
import React from "react";
import {
  BottomDiv,
  HeaderDiv,
  IconDiv,
  LeftDiv,
  Main,
  MainDiv,
  StatusDiv,
  Title,
  TopDiv,
} from "./style";
import NavbarPage from "@/components/navbar";
import ProfileSection from "@/components/profileSection/profileSection";
import InboxCard from "@/components/inboxCard/inboxCard";
import SVGIcon from "@/assets/icons/SVGIcon";
import { useRouter } from "next/navigation";
import Tag from "@/components/tag/tag";

export default function Details() {
  const router = useRouter();
  return (
    <Main>
      <NavbarPage />
      <MainDiv>
        <TopDiv>
          <HeaderDiv>
            <LeftDiv>
              <IconDiv
                onClick={() => {
                  router.push("/inbox");
                }}
              >
                <SVGIcon
                  name="back-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                />
              </IconDiv>
              <Title>Regarding app subscription issues from appsumo</Title>
            </LeftDiv>
            <IconDiv>
              <SVGIcon
                name="three-dot-icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              />
            </IconDiv>
          </HeaderDiv>
        </TopDiv>
        <TopDiv>
          <StatusDiv>
            <Tag
              isActive={false}
              onClick={() => {}}
              isName={false}
              iconName={"bug-icon"}
              title={"Bug"}
            />
            <Tag
              isActive={false}
              onClick={() => {}}
              isName={false}
              iconName={"bug-icon"}
              title={"Priority"}
            />
            <Tag
              isActive={false}
              onClick={() => {}}
              isName={true}
              iconName={"bug-icon"}
              title={"Sanjay M."}
              src="https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4"
            />
          </StatusDiv>
        </TopDiv>
        <BottomDiv></BottomDiv>
      </MainDiv>
      <ProfileSection />
    </Main>
  );
}
