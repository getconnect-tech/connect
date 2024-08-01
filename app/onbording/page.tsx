"use client";
import React, { useCallback, useRef, useState } from "react";
import {
  CenterCard,
  Heading,
  MainDiv,
  OnBoardScreen,
  Frame,
  Title,
  Profile,
  Description,
  Form,
  TextField,
  Label,
  DropBox,
  Bottom,
  Steps,
  CenterCardNext,
  NextProfile,
  Card,
  Icon,
  LabelDiv,
  BottomFrame,
  DetailSection,
} from "./style";
import SVGIcon from "@/assets/icons/SVGIcon";
import Avatar from "@/components/avtar/Avtar";
import Button from "@/components/button/button";
import Input from "@/components/input/input";
import DropDown from "@/components/dropDown/dropDown";

export default function OnBordingStep1() {
  const [showCard, setShowCard] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [inputField, setInputField] = useState([{ email: "", fullname: "" }]);
  const dropDownRef1 = useRef<HTMLDivElement | null>(null);

  const handleDropdownClick = useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [dropdownOpen]);

  const handleNextClick = useCallback(() => {
    setShowCard(true);
  }, []);

  const handleAddInput = useCallback(() => {
    setInputField([...inputField, { email: "", fullname: "" }]);
  }, [inputField]);

  const handleRemoveInputField = (index: number) => {
    const newInputField = inputField.filter((_, i) => i !== index);
    setInputField(newInputField);
  };
  const industryItems = [
    { name: "Technology and Software" },
    { name: "Data and Analytics" },
    { name: "Healthcare IT and Medical Devices" },
    { name: "Professional Services" },
    { name: "Financial Technologies (FinTech)" },
  ];
  return (
    <MainDiv>
      <OnBoardScreen isNext={showCard}>
        <Heading>
          <SVGIcon
            name="secondary-logo"
            width="60px"
            height="60px"
            viewBox="0 0 60 60"
          />
          <Title isNext={showCard}>
            Just a few quick things to set up your account
          </Title>
        </Heading>
        <Frame>
          {!showCard ? (
            <CenterCard>
              <Profile>
                <Avatar
                  imgSrc={
                    "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4"
                  }
                  name={""}
                  size={58}
                />
                <Description>
                  <h2>Hello, Sanjay M.</h2>
                  <p>First, tell us a bit about your company.</p>
                </Description>
              </Profile>
              <Form>
                <TextField isNext={showCard}>
                  <Label> Company Name</Label>
                  <DropBox>
                    Enter Company Name
                    <SVGIcon
                      name="down-arrow-icon"
                      width="12px"
                      height="12px"
                      viewBox="0 0 12 12"
                    />
                  </DropBox>
                </TextField>
                <TextField isNext={showCard}>
                  <Label> Team Size</Label>
                  <DropBox>
                    Select a Team Size
                    <SVGIcon
                      name="down-arrow-icon"
                      width="12px"
                      height="12px"
                      viewBox="0 0 12 12"
                    />
                  </DropBox>
                </TextField>
                <TextField isNext={showCard}>
                  <Label>Industry</Label>
                  <div>
                    <DropBox onClick={handleDropdownClick}>
                      Select a Industry
                      <SVGIcon
                        name={
                          dropdownOpen ? "up-arrow-icon" : "down-arrow-icon"
                        }
                        width="12px"
                        height="12px"
                        viewBox="0 0 12 12"
                      />
                    </DropBox>
                    {dropdownOpen && (
                      <DropDown
                        items={industryItems}
                        iconSize="20"
                        iconViewBox="0 0 20 20"
                        onClose={() => setDropdownOpen(false)}
                      />
                    )}
                  </div>
                </TextField>
              </Form>
            </CenterCard>
          ) : (
            <CenterCardNext>
              <NextProfile>
                <Avatar
                  imgSrc={
                    "https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4"
                  }
                  name={""}
                  size={58}
                />
                <Description>
                  <h2>Hello, Sanjay M.</h2>
                  <p>Invite members to collaborate in Connect</p>
                </Description>
              </NextProfile>
              <Form>
                <Card>
                  <LabelDiv>
                    <Label> Email Address</Label>
                    <Label>Full Name(Optional)</Label>
                  </LabelDiv>
                  <DetailSection>
                    {inputField.map((field, index) => (
                      <TextField isNext={showCard} key={index}>
                        <Input
                          placeholder={"Email Address"}
                          value={field.email}
                        />
                        <Input
                          placeholder={"Full Name"}
                          value={field.fullname}
                        />
                        <Icon onClick={() => handleRemoveInputField(index)}>
                          <SVGIcon
                            name="cross-icon"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                          />
                        </Icon>
                      </TextField>
                    ))}
                  </DetailSection>
                  <BottomFrame onClick={handleAddInput}>
                    <SVGIcon
                      name="plus-icon"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                    />
                    <p>
                      Add another <span>or</span> add many at once
                    </p>
                  </BottomFrame>
                </Card>
              </Form>
            </CenterCardNext>
          )}
          <Bottom>
            <Steps>{showCard ? <p>Step 2 of 2</p> : <p>Step 1 of 2 </p>}</Steps>
            {showCard ? (
              <Button title="Get started" onClick={handleNextClick} />
            ) : (
              <Button title="Next" onClick={handleNextClick} />
            )}
          </Bottom>
        </Frame>
      </OnBoardScreen>
    </MainDiv>
  );
}
