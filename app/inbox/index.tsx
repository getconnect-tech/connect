"use client";
import Navbar from "@/components/navbar";
import React, { useState } from "react";
import { HeaderDiv, Main, MainDiv, Tab, TabDiv, Title } from "./style";
import InboxCard from "../../components/inboxCard/inboxCard";

export default function Inbox() {
  const [activeTab, setActiveTab] = useState("Open");
  const tabItem = ["Open", "Snoozed", "Done"];

  return (
    <Main>
      <Navbar />
      <MainDiv>
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
        <InboxCard
          name={"Bhavdip Patel from Google"}
          title={"Regarding app subscription issues from appsumo"}
          description={
            "Complete your registration to activate your teamcamp subscription Complete your registration to activate your teamcamp subscription..."
          }
          time={"3 min ago"}
          showDotIcon={true}
        />
        <InboxCard
          name={"Bhavdip Patel from Google"}
          title={"Regarding app subscription issues from appsumo"}
          description={
            "Complete your registration to activate your teamcamp subscription Complete your registration to activate your teamcamp subscription..."
          }
          time={"10 min ago"}
        />
      </MainDiv>
    </Main>
  );
}
