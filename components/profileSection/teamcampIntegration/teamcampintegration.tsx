import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { MessageType } from '@prisma/client';
import SVGIcon from '@/assets/icons/SVGIcon';
import Modal from '@/components/modal/modal';
import { useStores } from '@/stores';
import { getTeamcampCredential } from '@/services/serverSide/serverAction';
import { isEmpty } from '@/helpers/common';
import { getTasksList } from '@/services/clientSide/teamcampService';
import Icon from '../../icon/icon';
import {
  AIIcon,
  AIText,
  DetailsMainDiv,
  ProfileDiv,
  Title,
  TitleDiv,
  WorkDetailMainDiv,
} from '../styles';
import {
  IconDiv,
  ItemDiv,
  ItemsMainDiv,
  LeftSection,
  RightIcon,
  SeeAllLink,
} from './styles';
import CreateTaskModal from './createTaskModal';

function TeamcampIntegration() {
  const { teamcampStore, ticketStore } = useStores();
  const { ticketDetails, messages } = ticketStore || {};
  const { taskList } = teamcampStore || {};

  const [teamcampProjectId, setTeamcampProjectId] = useState('');
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowAllToggle = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    const teamcampCredential = await getTeamcampCredential();
    await getTasksList(ticketDetails?.teamcamp_tasks || []);
    setLoading(false);
    if (teamcampCredential) setTeamcampProjectId(teamcampCredential.projectId);
  }, [ticketDetails?.teamcamp_tasks]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const eventsToShow = useMemo(() => {
    return showAll ? taskList : taskList.slice(0, 5);
  }, [showAll, taskList]);

  const renderTaskList = useMemo(() => {
    return loading ? (
      <>Loading...</>
    ) : (
      <>
        {eventsToShow.map((item, index) => (
          <ItemDiv
            key={index}
            onClick={() => {
              if (!isEmpty(teamcampProjectId))
                window.open(
                  // eslint-disable-next-line max-len
                  `https://dash.teamcamp.app/projects/details/${teamcampProjectId}/tasks?&task=${item.id}`,
                  '_blank',
                );
            }}
          >
            <LeftSection>
              <IconDiv>
                <SVGIcon
                  name={item.status}
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                />
              </IconDiv>
              <AIText>{item.name}</AIText>
            </LeftSection>
            <RightIcon>
              <SVGIcon
                name='arrow-icon'
                width='20'
                height='20'
                viewBox='0 0 20 20'
              />
            </RightIcon>
          </ItemDiv>
        ))}
        {!showAll && taskList.length > 5 && (
          <SeeAllLink onClick={handleShowAllToggle}>Show all</SeeAllLink>
        )}
        {showAll && (
          <SeeAllLink onClick={handleShowAllToggle}>Show Less</SeeAllLink>
        )}
      </>
    );
  }, [eventsToShow, loading, showAll, taskList.length, teamcampProjectId]);

  const handleModalOpen = useCallback(() => {
    const taskDescription = messages.findLast(
      (item) => item.type === MessageType.FROM_CONTACT,
    )?.content;

    if (ticketDetails && taskDescription) {
      teamcampStore.updateTaskCreateInput('taskName', ticketDetails?.title);
      teamcampStore.updateTaskCreateInput('description', taskDescription);
    }
    setCreateTaskModal(true);
  }, [messages, teamcampStore, ticketDetails]);

  const handleModalClose = useCallback(() => {
    setCreateTaskModal(false);
  }, []);

  return (
    <>
      <WorkDetailMainDiv>
        <TitleDiv>
          <ProfileDiv>
            <AIIcon>
              <SVGIcon
                name='teamcamp-logo'
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
              />
            </AIIcon>
            <Title>Teamcamp</Title>
          </ProfileDiv>
          <Icon
            iconName='teamcamp-plus-icon'
            iconSize='16'
            iconViewBox='0 0 16 16'
            size={true}
            className='refresh-icon'
            onClick={handleModalOpen}
          />
        </TitleDiv>
        <DetailsMainDiv>
          <ItemsMainDiv>{renderTaskList}</ItemsMainDiv>
        </DetailsMainDiv>
      </WorkDetailMainDiv>
      <Modal open={createTaskModal} onClose={handleModalClose}>
        <CreateTaskModal onClose={handleModalClose} />
      </Modal>
    </>
  );
}

export default observer(TeamcampIntegration);
