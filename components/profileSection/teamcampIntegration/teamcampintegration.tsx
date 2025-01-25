import React, { useCallback, useMemo, useState } from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import Modal from '@/components/modal/modal';
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
} from './styles';
import CreateTaskModal from './createTaskModal';

function TeamcampIntegration() {
  const [createTaskModal, setCreateTaskModal] = useState(false);

  const taskList = useMemo(() => {
    const taskItem = [
      {
        title: 'Provide option to add email signature on setting',
        iconName: 'complete-icon',
      },
      {
        title: 'Improve manage signature dropdown',
        iconName: 'canceled-icon',
      },
      {
        title: 'Make “Select templates” working',
        iconName: 'default-icon',
      },
      {
        title: 'Create design for integrating Teamcamp',
        iconName: 'in-progress-icon',
      },
      {
        title: 'Create location card design',
        iconName: 'in-review-icon',
      },
      {
        title: 'Create CTA component Design',
        iconName: 'backlog-icon',
      },
    ];

    return (
      <>
        {taskItem.map((item, index) => (
          <ItemDiv key={index}>
            <LeftSection>
              <IconDiv>
                <SVGIcon
                  name={item.iconName}
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                />
              </IconDiv>
              <AIText>{item.title}</AIText>
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
      </>
    );
  }, []);

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
          <ItemsMainDiv>{taskList}</ItemsMainDiv>
        </DetailsMainDiv>
      </WorkDetailMainDiv>
      <Modal open={createTaskModal} onClose={handleModalClose}>
        <CreateTaskModal onClose={handleModalClose} />
      </Modal>
    </>
  );
}

export default TeamcampIntegration;
