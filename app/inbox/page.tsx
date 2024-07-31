"use client";
import React, { useState } from "react";
import {
  BottomDiv,
  HeaderDiv,
  Main,
  MainDiv,
  Tab,
  TabDiv,
  Title,
  TopDiv,
} from "./style";
import NavbarPage from "@/components/navbar";
import InboxCard from "@/components/inboxCard/inboxCard";

export default function Inbox() {
  const [activeTab, setActiveTab] = useState("Open");
  const tabItem = ["Open", "Snoozed", "Done"];

  const statuses1 = [
    { title: "Question", isName: false, iconName: "question-icon" },
    { title: "Priority", isName: false, iconName: "inbox-icon" },
    {
      title: "Sanjay M.",
      isName: true,
      avatarUrl:
        "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4",
    },
  ];

  const statuses2 = [
    { title: "Bug", isName: false, iconName: "bug-icon" },
    { title: "Priority", isName: false, iconName: "inbox-icon" },
    {
      title: "Sanjay M.",
      isName: true,
      avatarUrl:
        "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4",
    },
  ];

  return (
    <Main>
      <NavbarPage />
      <MainDiv>
        <TopDiv>
          <HeaderDiv>
            <Title>Inbox</Title>
            <TabDiv>
              {tabItem.map((tab) => (
                <Tab
                  key={tab}
                  active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Tab>
              ))}
            </TabDiv>
          </HeaderDiv>
        </TopDiv>
        <BottomDiv>
          <InboxCard
            name={"Bhavdip Patel from Google"}
            title={"Regarding app subscription issues from appsumo"}
            description={
              "Complete your registration to activate your teamcamp subscription Complete your registration to activate your teamcamp subscription..."
            }
            time={"3 min ago"}
            showDotIcon={true}
            status={statuses1}
            src={
              "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4"
            }
          />
          <InboxCard
            name={"Bhavdip Patel from Google"}
            title={"Regarding app subscription issues from appsumo"}
            description={
              "Complete your registration to activate your teamcamp subscription Complete your registration to activate your teamcamp subscription..."
            }
            time={"10 min ago"}
            status={statuses2}
            src={
              "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4"
            }
          />
        </BottomDiv>
      </MainDiv>
    </Main>
  );
}
