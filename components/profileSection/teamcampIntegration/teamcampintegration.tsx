import React, { useCallback, useMemo, useState } from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import Modal from '@/components/modal/modal';
import { useStores } from '@/stores';
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
  const { teamcampStore } = useStores();
  const { taskList } = teamcampStore || {};

  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleShowAllToggle = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };

  const eventsToShow = useMemo(() => {
    return showAll ? taskList : taskList.slice(0, 5);
  }, [showAll, taskList]);

  const renderTaskList = useMemo(() => {
    return (
      <>
        {eventsToShow.map((item, index) => (
          <ItemDiv key={index}>
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
            <RightIcon
              onClick={() => {
                window.open(
                  // eslint-disable-next-line max-len
                  `https://dash.teamcamp.app/projects/details/${process.env.NEXT_PUBLIC_TEAMCAMP_PROJECT_ID}/tasks?&task=${item.id}`,
                  '_blank',
                );
              }}
            >
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
  }, [eventsToShow, showAll, taskList.length]);

  const handleModalOpen = useCallback(() => {
    setCreateTaskModal(true);
  }, []);

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

export default TeamcampIntegration;
