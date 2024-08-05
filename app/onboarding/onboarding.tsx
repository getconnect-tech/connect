/* eslint-disable max-len */
'use client';
import React, { ChangeEvent, useCallback, useState } from 'react';
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
import DropDown, { DropDownItem } from "@/components/dropDown/dropDown";
import { industryItems, teamMember } from "@/helpers/raw";
import { useStores } from "@/stores";
import { observer } from "mobx-react-lite";
import { createWorkspace, inviteUsersToWorkspace } from "@/services/clientSide/workspace";
import { useRouter } from "next/navigation";
import { isEmpty } from "@/helpers/common";

function OnboardingStep1() {
  const [showCard, setShowCard] = useState(false);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [inputField, setInputField] = useState([{ email: '', displayName: '' }]);

  const {
    userStore: { user },
    workspaceStore,
  } = useStores();

  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceTeamSize, setWorkspaceTeamSize] = useState<DropDownItem>();
  const [workspaceIndustry, setWorkspaceIndustry] = useState<DropDownItem>();
  const router = useRouter();


  const handleIndustryClick = useCallback(() => {
    setIndustryDropdownOpen(!industryDropdownOpen);
    setTeamDropdownOpen(false);
  }, [industryDropdownOpen]);

  const handleTeamSizeClick = useCallback(() => {
    setTeamDropdownOpen(!teamDropdownOpen);
    setIndustryDropdownOpen(false);
  }, [teamDropdownOpen]);

  const handleCreateWorkspace = useCallback(async () => {
    const result = await createWorkspace(workspaceName, workspaceTeamSize?.value, workspaceIndustry!.name);
    if (result) {
      setShowCard(true);
    }
  }, [workspaceIndustry, workspaceName, workspaceTeamSize?.value]);

  const handleAddInput = useCallback(() => {
    setInputField([...inputField, { email: '', displayName: '' }]);
  }, [inputField]);

  const handleRemoveInputField = (index: number) => {
    const newInputField = inputField.filter((_, i) => i !== index);
    setInputField(newInputField);
  };

  const handleTeamSizeChange = (item: DropDownItem) => {
    setWorkspaceTeamSize(item);
  };

  const handleIndustryChange = (item: DropDownItem) => {
    setWorkspaceIndustry(item);
  };

  const handleInvitedUserInputChange = (type: "displayName" | "email", value: string, index: number) => {
    setInputField((prev) => {
      const newState = [...prev];
      newState[index][type] = value;
      return newState;
    });
  };

  const handleGetStarted = async () => {
    const usersToInvite = inputField.filter(({ displayName, email }) => !isEmpty(displayName) && !isEmpty(email));
    const result = await inviteUsersToWorkspace(usersToInvite);
    if (result) {
      router.replace("/");
    }
  };

  return (
    <MainDiv>
      <OnBoardScreen isNext={showCard}>
        <Heading>
          <SVGIcon
            name='secondary-logo'
            width='60px'
            height='60px'
            viewBox='0 0 60 60'
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
                    'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4'
                  }
                  name={''}
                  size={58}
                />
                <Description>
                  <h2>Hello, {user?.display_name}</h2>
                  <p>First, tell us a bit about your company.</p>
                </Description>
              </Profile>
              <Form>
                <TextField isNext={showCard}>
                  <Label>Company Name</Label>
                  <Input
                    placeholder={"Enter company name"}
                    style={{ padding: "8px 16px" }}
                    value={workspaceName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setWorkspaceName(e.target.value)}
                  />
                </TextField>

                <TextField isNext={showCard}>
                  <Label>Team Size</Label>
                  <div>
                    {/* apply className while open drop down */}
                    <DropBox onClick={handleTeamSizeClick} className="tag-div">
                      {workspaceTeamSize ? workspaceTeamSize.name : "Select a Team Size"}
                      <SVGIcon
                        name={teamDropdownOpen ? "up-arrow-icon" : "down-arrow-icon"}
                        width="12px"
                        height="12px"
                        viewBox="0 0 12 12"
                      />
                    </DropBox>
                    {teamDropdownOpen && (
                      <DropDown
                        items={teamMember}
                        iconSize='20'
                        iconViewBox='0 0 20 20'
                        onClose={() => setTeamDropdownOpen(false)}
                        onChange={handleTeamSizeChange}
                        style={{ width: "100%", maxWidth: 332 }}
                      />
                    )}
                  </div>
                </TextField>
                <TextField isNext={showCard}>
                  <Label>Industry</Label>
                  <div>
                    {/* apply className while open drop down */}
                    <DropBox onClick={handleIndustryClick} className="tag-div">
                      {workspaceIndustry ? workspaceIndustry.name : "Select a Industry"}
                      <SVGIcon
                        name={industryDropdownOpen ? "up-arrow-icon" : "down-arrow-icon"}
                        width="12px"
                        height="12px"
                        viewBox="0 0 12 12"
                      />
                    </DropBox>
                    {industryDropdownOpen && (
                      <DropDown
                        items={industryItems}
                        iconSize='20'
                        iconViewBox='0 0 20 20'
                        onClose={() => setIndustryDropdownOpen(false)}
                        style={{ width: "100%", maxWidth: 332 }}
                        onChange={handleIndustryChange}
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
                    'https://firebasestorage.googleapis.com/v0/b/teamcamp-app.appspot.com/o/UserProfiles%2FUntitled1_1701236653470.jpg?alt=media&token=8bc07cdb-5fcc-4c69-8e0d-c9978b94b3e4'
                  }
                  name={''}
                  size={58}
                />
                <Description>
                  <h2>Hello, {user?.display_name}</h2>
                  <p>Invite members to collaborate in Connect</p>
                </Description>
              </NextProfile>
              <Form>
                <Card>
                  <LabelDiv>
                    <Label>Email Address</Label>
                    <Label>Full Name</Label>
                  </LabelDiv>
                  <DetailSection>
                    {inputField.map((field, index) => (
                      <TextField isNext={showCard} key={index}>
                        <Input
                          placeholder={"Email Address"}
                          type="email"
                          value={field.email}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInvitedUserInputChange("email", e.target.value, index)}
                        />
                        <Input
                          placeholder={"Full Name"}
                          type="text"
                          value={field.displayName}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInvitedUserInputChange("displayName", e.target.value, index)}
                        />
                        <Icon onClick={() => handleRemoveInputField(index)}>
                          <SVGIcon
                            name='cross-icon'
                            width='12'
                            height='12'
                            viewBox='0 0 12 12'
                          />
                        </Icon>
                      </TextField>
                    ))}
                  </DetailSection>
                  <BottomFrame>
                    <Button
                      title='Add Another'
                      iconName='plus-icon'
                      iconSize='12'
                      iconViewBox='0 0 12 12'
                      isLink
                      onClick={handleAddInput}
                    />
                  </BottomFrame>
                </Card>
              </Form>
            </CenterCardNext>
          )}
          <Bottom>
            <Steps>{showCard ? <p>Step 2 of 2</p> : <p>Step 1 of 2 </p>}</Steps>
            {showCard ? (
              <Button title="Get started" onClick={handleGetStarted} isLoading={workspaceStore.loading} />
            ) : (
              <Button title="Create Workspace" onClick={handleCreateWorkspace} isLoading={workspaceStore.loading} />
            )}
          </Bottom>
        </Frame>
      </OnBoardScreen>
    </MainDiv>
  );
}

export default observer(OnboardingStep1);
