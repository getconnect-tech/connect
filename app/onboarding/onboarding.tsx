/* eslint-disable max-len */
'use client';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import moment from 'moment-timezone';
import { TimePickerProps } from 'antd';
import SVGIcon from '@/assets/icons/SVGIcon';
import Avatar from '@/components/avtar/Avtar';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import DropDown, { DropDownItem } from '@/components/dropDown/dropDown';
import { industryItems, teamMember } from '@/helpers/raw';
import { useStores } from '@/stores';
import {
  createWorkspace,
  inviteUsersToWorkspace,
} from '@/services/clientSide/workspaceServices';
import { isEmpty } from '@/helpers/common';

import DropDownWithTag from '@/components/dropDownWithTag/dropDownWithTag';
import Icon from '@/components/icon/icon';
import TimePickerSection from '../setting/workspaceprofile/timePickerSection';
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
  Bottom,
  Steps,
  CenterCardNext,
  NextProfile,
  Card,
  LabelDiv,
  BottomFrame,
  DetailSection,
  TimeZoneContentDiv,
  DropdownDiv,
  DropdownTrigger,
  TimeContentDiv,
} from './style';

function OnboardingStep1() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCard, setShowCard] = useState(false);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [inputField, setInputField] = useState([
    { email: '', displayName: '' },
  ]);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [timeValue, setTimeValue] = useState<string | null>(null);

  const {
    userStore: { user },
    workspaceStore,
  } = useStores();

  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceTeamSize, setWorkspaceTeamSize] = useState<DropDownItem>();
  const [workspaceIndustry, setWorkspaceIndustry] = useState<DropDownItem>();
  const router = useRouter();

  const timeZones = moment.tz.names().map((zone) => {
    const offset = moment.tz(zone).utcOffset();
    const hours = Math.floor(offset / 60);
    const minutes = Math.abs(offset % 60);
    const sign = offset >= 0 ? '+' : '-';
    const label = `UTC${sign}${String(Math.abs(hours)).padStart(2, '0')}:${String(
      Math.abs(minutes),
    ).padStart(2, '0')} - ${zone}`;

    return {
      id: zone,
      name: label,
      label: label,
      value: zone,
      onClick: () => handleTimezoneSelect(),
    };
  });

  const handleTimezoneSelect = useCallback(() => {
    setIsOpenDropdown(false);
  }, []);

  const handleIndustryClick = useCallback(() => {
    setIndustryDropdownOpen(!industryDropdownOpen);
    setTeamDropdownOpen(false);
  }, [industryDropdownOpen]);

  const handleTeamSizeClick = useCallback(() => {
    setTeamDropdownOpen(!teamDropdownOpen);
    setIndustryDropdownOpen(false);
  }, [teamDropdownOpen]);

  const handleCreateWorkspace = useCallback(async () => {
    const result = await createWorkspace(
      workspaceName,
      workspaceTeamSize?.value,
      workspaceIndustry!.name,
    );
    if (result) {
      setCurrentStep(2);
      setShowCard(true);
    }
  }, [workspaceIndustry, workspaceName, workspaceTeamSize?.value]);

  const handleAddInput = useCallback(() => {
    setInputField([...inputField, { email: '', displayName: '' }]);
  }, [inputField]);

  const handleRemoveInputField = useCallback(
    (index: number) => {
      const newInputField = inputField?.filter((_, i) => i !== index);
      setInputField(newInputField);
    },
    [inputField],
  );

  const handleTeamSizeChange = useCallback((item: DropDownItem) => {
    setWorkspaceTeamSize(item);
  }, []);

  const handleIndustryChange = useCallback((item: DropDownItem) => {
    setWorkspaceIndustry(item);
  }, []);

  const handleInvitedUserInputChange = useCallback(
    (type: 'displayName' | 'email', value: string, index: number) => {
      setInputField((prev) => {
        const newState = [...prev];
        newState[index][type] = value;
        return newState;
      });
    },
    [],
  );

  const handleNextStep = useCallback(() => {
    if (currentStep === 2) {
      setCurrentStep(3);
    }
  }, [currentStep]);

  const handleGetStarted = useCallback(async () => {
    const usersToInvite = inputField?.filter(
      ({ displayName, email }) => !isEmpty(displayName) && !isEmpty(email),
    );
    const result = await inviteUsersToWorkspace(usersToInvite);
    if (result) {
      router.replace('/');
    }
  }, [inputField, router]);

  const onChange: TimePickerProps['onChange'] = (time, timeString) => {
    if (typeof timeString === 'string') {
      setTimeValue(timeString);
    } else {
      setTimeValue(null);
    }
  };

  // Step 1: Company Information
  const renderCompanyInfoStep = useCallback(
    () => (
      <CenterCard>
        <Profile>
          <Avatar
            imgSrc={user?.profile_url || ''}
            name={user?.display_name || ''}
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
              placeholder={'Enter company name'}
              style={{ padding: '8px 16px' }}
              value={workspaceName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWorkspaceName(e.target.value)
              }
            />
          </TextField>
          <TextField isNext={showCard}>
            <Label>Team Size</Label>
            <DropDownWithTag
              onClick={handleTeamSizeClick}
              title={'Select a Team Size'}
              selectedValue={workspaceTeamSize}
              style={{
                color: workspaceTeamSize && 'var(--text)',
              }}
              iconName={teamDropdownOpen ? 'up-arrow-icon' : 'down-arrow-icon'}
              onClose={() => setTeamDropdownOpen(false)}
              items={teamMember}
              onChange={handleTeamSizeChange}
              dropdownOpen={teamDropdownOpen}
              dropDownStyle={{ width: '100%', maxWidth: 332 }}
              isTag={false}
            />
          </TextField>
          <TextField isNext={showCard}>
            <Label>Industry</Label>
            <DropDownWithTag
              onClick={handleIndustryClick}
              title={'Select a Industry'}
              selectedValue={workspaceIndustry}
              style={{
                color: workspaceIndustry && 'var(--text)',
              }}
              iconName={
                industryDropdownOpen ? 'up-arrow-icon' : 'down-arrow-icon'
              }
              onClose={() => setIndustryDropdownOpen(false)}
              items={industryItems}
              onChange={handleIndustryChange}
              dropdownOpen={industryDropdownOpen}
              dropDownStyle={{ width: '100%', maxWidth: 332 }}
              isTag={false}
            />
          </TextField>
        </Form>
      </CenterCard>
    ),
    [
      handleIndustryClick,
      handleTeamSizeClick,
      industryDropdownOpen,
      showCard,
      teamDropdownOpen,
      user?.display_name,
      user?.profile_url,
      workspaceIndustry,
      workspaceName,
      workspaceTeamSize,
    ],
  );

  // Step 2: Timezone and Office Hours
  const renderTimezoneStep = useCallback(
    () => (
      <CenterCard>
        <NextProfile>
          <Avatar
            imgSrc={user?.profile_url || ''}
            name={user?.display_name || ''}
            size={58}
          />
          <Description>
            <h2>Hello, {user?.display_name}</h2>
            <p>
              Set your office hours and easily update them anytime in settings!
            </p>
          </Description>
        </NextProfile>
        <Form>
          <Card>
            <TimeZoneContentDiv>
              <Label>Current Timezone</Label>
              <DropdownDiv className='tag-div'>
                <DropdownTrigger
                  onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                >
                  Select timezone
                  <SVGIcon
                    name={isOpenDropdown ? 'up-arrow-icon' : 'down-arrow-icon'}
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                  />
                </DropdownTrigger>
                {isOpenDropdown && (
                  <DropDown
                    items={timeZones}
                    iconSize={'12'}
                    iconViewBox={'0 0 12 12'}
                    onClose={() => setIsOpenDropdown(false)}
                    className='timezone-dropdown'
                  />
                )}
              </DropdownDiv>
            </TimeZoneContentDiv>
            <TimeContentDiv>
              <TimePickerSection label={'Form'} onChange={() => onChange} />
              <TimePickerSection label={'To'} onChange={() => onChange} />
            </TimeContentDiv>
          </Card>
        </Form>
      </CenterCard>
    ),
    [isOpenDropdown, timeZones, user?.display_name, user?.profile_url],
  );

  // Step 3: Team Invite
  const renderTeamInviteStep = useCallback(
    () => (
      <CenterCardNext>
        <NextProfile>
          <Avatar
            imgSrc={user?.profile_url || ''}
            name={user?.display_name || ''}
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
                    placeholder={'Email Address'}
                    type='email'
                    value={field.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInvitedUserInputChange(
                        'email',
                        e.target.value,
                        index,
                      )
                    }
                  />
                  <Input
                    placeholder={'Full Name'}
                    type='text'
                    value={field.displayName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleInvitedUserInputChange(
                        'displayName',
                        e.target.value,
                        index,
                      )
                    }
                  />
                  <Icon
                    onClick={() => handleRemoveInputField(index)}
                    iconName={'cross-icon'}
                    iconSize={'12'}
                    iconViewBox={'0 0 16 16'}
                    size={true}
                  />
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
    ),
    [
      handleAddInput,
      handleRemoveInputField,
      inputField,
      showCard,
      user?.display_name,
      user?.profile_url,
    ],
  );

  // Render the appropriate step content based on currentStep
  const renderStepContent = useCallback(() => {
    switch (currentStep) {
      case 1:
        return renderCompanyInfoStep();
      case 2:
        return renderTimezoneStep();
      case 3:
        return renderTeamInviteStep();
      default:
        return renderCompanyInfoStep();
    }
  }, [
    currentStep,
    renderCompanyInfoStep,
    renderTimezoneStep,
    renderTeamInviteStep,
  ]);

  // Get the appropriate button based on currentStep
  const renderStepButton = useCallback(() => {
    switch (currentStep) {
      case 1:
        return (
          <Button
            title='Create Workspace'
            onClick={handleCreateWorkspace}
            isLoading={workspaceStore.loading}
          />
        );
      case 2:
        return (
          <Button
            title='Next'
            onClick={handleNextStep}
            isLoading={workspaceStore.loading}
          />
        );
      case 3:
        return (
          <Button
            title='Get started'
            onClick={handleGetStarted}
            isLoading={workspaceStore.loading}
          />
        );
      default:
        return null;
    }
  }, [
    currentStep,
    handleCreateWorkspace,
    workspaceStore.loading,
    handleNextStep,
    handleGetStarted,
  ]);

  return (
    <MainDiv>
      <OnBoardScreen isNext={currentStep === 3}>
        <Heading>
          <SVGIcon
            name='logo-icon'
            width='60px'
            height='60px'
            viewBox='0 0 20 20'
          />
          <Title isNext={currentStep === 3}>
            Just a few quick things to set up your account
          </Title>
        </Heading>
        <Frame>
          {renderStepContent()}
          <Bottom>
            <Steps>
              <p>Step {currentStep} of 3</p>
            </Steps>
            {renderStepButton()}
          </Bottom>
        </Frame>
      </OnBoardScreen>
    </MainDiv>
  );
}

export default observer(OnboardingStep1);
