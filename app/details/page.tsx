"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityDiv,
  BottomDiv,
  CenterDiv,
  HeaderDiv,
  IconDiv,
  Input,
  InputDiv,
  InputIcon,
  LeftDiv,
  LineDiv,
  Main,
  MainDiv,
  Message,
  StatusDiv,
  Title,
  TopDiv,
} from "./style";
import NavbarPage from "@/components/navbar";
import ProfileSection from "@/components/profileSection/profileSection";
import SVGIcon from "@/assets/icons/SVGIcon";
import { useRouter } from "next/navigation";
import Tag from "@/components/tag/tag";
import Avatar from "@/components/avtar/Avtar";
import MessageCard from "@/components/messageCard/messageCard";
import QuestionCard from "@/components/questionCard/questionCard";
import DropDown from "@/components/dropDown/dropDown";

export default function Details() {
  const router = useRouter();
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [showDropDown2, setShowDropDown2] = useState(false);
  const dropDownRef1 = useRef<HTMLDivElement | null>(null);
  const dropDownRef2 = useRef<HTMLDivElement | null>(null);

  const handleTagClick1 = () => {
    setShowDropDown1((prev) => !prev);
  };

  const handleTagClick2 = () => {
    setShowDropDown2((prev) => !prev);
  };

  const handleClickOutside1 = (event: MouseEvent) => {
    if (
      dropDownRef1.current &&
      !dropDownRef1.current.contains(event.target as Node)
    ) {
      setShowDropDown1(false);
    }
  };

  const handleClickOutside2 = (event: MouseEvent) => {
    if (
      dropDownRef2.current &&
      !dropDownRef2.current.contains(event.target as Node)
    ) {
      setShowDropDown2(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside1);
    document.addEventListener("mousedown", handleClickOutside2);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside1);
      document.removeEventListener("mousedown", handleClickOutside2);
    };
  }, []);

  const items1 = [
    { name: "No priority", icon: "priority-no-icon" },
    { name: "Urgent", icon: "priority-urgent-icon" },
    { name: "High", icon: "priority-high-icon" },
    { name: "Medium", icon: "priority-Medium-icon" },
    { name: "Low", icon: "priority-low-icon" },
  ];

  const items2 = [
    { name: "Unassigned", icon: "dropdown-unassign-icon" },
    {
      name: "Sanjay M.",
      src: "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4",
      isName: true,
    },
    {
      name: "Aniket",
      src: "https://bearbuk.blob.core.windows.net/project/Profile_63c0ec5555376218700f12d5_2023041410225842.png",
      isName: true,
    },
    {
      name: "Jemish",
      src: "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4",
      isName: true,
    },
    {
      name: "Vatsal",
      src: "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2F1708409574833_1712819712813.jpg?alt=media&token=42df7e19-9083-4c61-8b51-b43d5c3f4183",
      isName: true,
    },
  ];

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
          <StatusDiv>
            <Tag
              isActive={true}
              onClick={() => {}}
              isName={false}
              iconName={"bug-icon"}
              title={"Bug"}
            />
            <div>
              <Tag
                isActive={true}
                onClick={handleTagClick1}
                isName={false}
                iconName={"priority-no-icon"}
                title={"Priority"}
              />
              {showDropDown1 && (
                <DropDown
                  ref={dropDownRef1}
                  items={items1}
                  iconSize="12"
                  iconViewBox="0 0 12 12"
                />
              )}
            </div>
            <div>
              <Tag
                isActive={true}
                onClick={handleTagClick2}
                isName={true}
                iconName={"bug-icon"}
                title={"Sanjay M."}
                src="https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4"
              />
              {showDropDown2 && (
                <DropDown
                  ref={dropDownRef2}
                  items={items2}
                  iconSize="20"
                  iconViewBox="0 0 20 20"
                />
              )}
            </div>
          </StatusDiv>
        </TopDiv>
        <BottomDiv>
          <CenterDiv>
            <ActivityDiv>
              <Avatar
                imgSrc={
                  "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4"
                }
                name={""}
                size={20}
              />
              <QuestionCard
                title={"@Aniket can you please look into this?"}
                time={"3 day ago"}
              />
            </ActivityDiv>
            <LineDiv />
            <ActivityDiv>
              <Avatar
                imgSrc={
                  "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4"
                }
                name={""}
                size={20}
              />
              <MessageCard
                title={"Sanjay send email"}
                time={"2 days ago"}
                subTitle={"To Teamcamp Support "}
                message={
                  "Hey,Thank you for choosing our services through our partner, Parthern. To ensure you receive the full benefits of your purchase, we invite you to create an account with us at Teamcamp.Create Your Account Today!Setting up your Teamcamp account is quick and easy. Follow this link to get started: www.teamcamp.app Need Help?If you have any questions or need assistance during the registration process, please do not hesitate to reply to this emailWe're excited to have you on board and look forward to supporting your project management needs!Warm regards,Sanjay M."
                }
              />
            </ActivityDiv>
            <LineDiv />
            <ActivityDiv>
              <Avatar
                imgSrc={
                  "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4"
                }
                name={""}
                size={20}
              />
              <Message>
                Connect AI <span>set priority to</span> Low
                <SVGIcon
                  name="dot-icon"
                  width="4"
                  height="4"
                  fill="none"
                  viewBox="0 0 4 4"
                />
                <span>2 min ago</span>
              </Message>
            </ActivityDiv>
            <LineDiv />
            <ActivityDiv>
              <Avatar
                imgSrc={
                  "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4"
                }
                name={""}
                size={20}
              />
              <Message>
                Connect AI <span>assigned this ticket to</span> Sanjay M.
                <SVGIcon
                  name="dot-icon"
                  width="4"
                  height="4"
                  fill="none"
                  viewBox="0 0 4 4"
                />
                <span>2 min ago</span>
              </Message>
            </ActivityDiv>
          </CenterDiv>
          <InputDiv>
            <Avatar
              imgSrc={
                "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4"
              }
              size={20}
              name={""}
            />
            <Input>
              <textarea placeholder="Write a message" />
              <InputIcon>
                <IconDiv>
                  <SVGIcon
                    name="attach-icon"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                  />
                </IconDiv>
                <IconDiv className="send-icon">
                  <SVGIcon
                    name="send-icon"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                  />
                </IconDiv>
              </InputIcon>
            </Input>
          </InputDiv>
        </BottomDiv>
      </MainDiv>
      <ProfileSection />
    </Main>
  );
}
