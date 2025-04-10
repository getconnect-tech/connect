'use client';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Avatar from '@/components/avtar/Avtar';
import Input from '@/components/input/input';
import DropDownWithTag from '@/components/dropDownWithTag/dropDownWithTag';
import { useStores } from '@/stores';
import { industryItems, teamMember } from '@/helpers/raw';
import { DropDownItem } from '@/components/dropDown/dropDown';
import Button from '@/components/button/button';
import { createWorkspace } from '@/services/clientSide/workspaceServices';
import {
  CenterCard,
  Profile,
  Description,
  Form,
  TextField,
  Label,
  Bottom,
  Steps,
} from './style';

interface CompanyInfoStepProps {
  // eslint-disable-next-line no-unused-vars
  setCurrentStep: (step: number) => void;
}

const CompanyInfoStep = ({ setCurrentStep }: CompanyInfoStepProps) => {
  // State variables
  const [showCard, setShowCard] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const [workspaceTeamSize, setWorkspaceTeamSize] = useState<DropDownItem>();
  const [workspaceIndustry, setWorkspaceIndustry] = useState<DropDownItem>();

  //mobx store variables
  const {
    userStore: { user },
    workspaceStore,
  } = useStores();

  // Handle the click of the team size dropdown
  const handleTeamSizeClick = useCallback(() => {
    setTeamDropdownOpen(!teamDropdownOpen);
    setIndustryDropdownOpen(false);
  }, [teamDropdownOpen]);

  // Handle the change of team size
  const handleTeamSizeChange = useCallback((item: DropDownItem) => {
    setWorkspaceTeamSize(item);
  }, []);

  // Handle the click of industry dropdown
  const handleIndustryClick = useCallback(() => {
    setIndustryDropdownOpen(!industryDropdownOpen);
    setTeamDropdownOpen(false);
  }, [industryDropdownOpen]);

  // Handle the change of industry
  const handleIndustryChange = useCallback((item: DropDownItem) => {
    setWorkspaceIndustry(item);
  }, []);

  // Handle the creation of the workspace
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
  }, [
    setCurrentStep,
    workspaceIndustry,
    workspaceName,
    workspaceTeamSize?.value,
  ]);

  return (
    <>
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
      <Bottom>
        <Steps>
          <p>Step 1 of 3</p>
        </Steps>
        <Button
          title='Create Workspace'
          onClick={handleCreateWorkspace}
          isLoading={workspaceStore.loading}
        />
      </Bottom>
    </>
  );
};

export default observer(CompanyInfoStep);
