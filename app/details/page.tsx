"use client";
import React from "react";
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
          <StatusDiv>
            <Tag
              isActive={true}
              onClick={() => {}}
              isName={false}
              iconName={"bug-icon"}
              title={"Bug"}
            />
            <Tag
              isActive={true}
              onClick={() => {}}
              isName={false}
              iconName={"priority-no-icon"}
              title={"Priority"}
            />
            <Tag
              isActive={true}
              onClick={() => {}}
              isName={true}
              iconName={"bug-icon"}
              title={"Sanjay M."}
              src="https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4"
            />
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
