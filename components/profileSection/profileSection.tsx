import React from "react";
import {
  CompanyName,
  DetailsDiv,
  DetailsMainDiv,
  LeftDiv,
  MainDiv,
  ProfileDiv,
  Title,
} from "./styles";
import Avatar from "../avtar/Avtar";
import SVGIcon from "@/assets/icons/SVGIcon";
import { colors } from "@/styles/colors";
import WorkDetails from "./workDetails";
import RecentEvent from "./recentEvent";

export default function ProfileSection() {
  return (
    <MainDiv>
      <ProfileDiv>
        <Avatar
          imgSrc="https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4"
          name={""}
          size={58}
        />
        <div>
          <Title>Sanjay Patel</Title>
          <CompanyName>Pixer Digital</CompanyName>
        </div>
      </ProfileDiv>
      <DetailsMainDiv>
        <DetailsDiv>
          <LeftDiv>
            <SVGIcon
              name="inbox-icon"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill={colors.icon}
            />
            <p>Role</p>
          </LeftDiv>
          <p>Project Manager</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <SVGIcon
              name="inbox-icon"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill={colors.icon}
            />
            <p>Phone</p>
          </LeftDiv>
          <p>(628) 225-4852</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <SVGIcon
              name="inbox-icon"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill={colors.icon}
            />
            <p>Email</p>
          </LeftDiv>
          <p>John.pixer@gmail.com</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <SVGIcon
              name="inbox-icon"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill={colors.icon}
            />
            <p>First contacted</p>
          </LeftDiv>
          <p>May 14, 2024</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <SVGIcon
              name="inbox-icon"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill={colors.icon}
            />
            <p>Created by</p>
          </LeftDiv>
          <p>Jane smith</p>
        </DetailsDiv>
        <DetailsDiv>
          <LeftDiv>
            <SVGIcon
              name="inbox-icon"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill={colors.icon}
            />
            <p>Access</p>
          </LeftDiv>
          <p>Everyone</p>
        </DetailsDiv>
      </DetailsMainDiv>
      <WorkDetails />
      <RecentEvent />
    </MainDiv>
  );
}
