import React, { useCallback, useRef, useState } from 'react';
import SVGIcon from '@/assets/icons/SVGIcon';
import Icon from '@/components/icon/icon';
import {
  BottomLeftSection,
  BottomSection,
  CenterDiv,
  Header,
  Input,
  LeftSection,
  MainDiv,
  TextArea,
  Title,
} from './styles';
import AssigneeDropdown from '@/components/AssigneeDropdown/dropDownWithTag';
import { useStores } from '@/stores';
import DropDownWithTag from '@/components/dropDownWithTag/dropDownWithTag';
import { priorityItem } from '@/helpers/raw';
import Button from '@/components/button/button';

interface Props {
  onClose: () => void;
}

function CreateTaskModal({ onClose }: Props) {
  const [assignDropdown, setAssignDropdown] = useState(false);
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for file input

  const { workspaceStore, ticketStore } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const { ticketDetails } = ticketStore || {};
  const { priority } = ticketDetails || {};

  const handleAssignTag = useCallback(() => {
    setAssignDropdown((prev) => !prev);
  }, []);

  const handlePriorityTag = useCallback(() => {
    setPriorityDropdown((prev) => !prev);
    setAssignDropdown(false);
  }, []);

  const assignItem = [
    { name: 'Unassigned', icon: 'dropdown-unassign-icon' },
    ...(currentWorkspace?.users?.map((user) => ({
      name: user.display_name || '',
      src: user.profile_url || '',
      isName: true,
      user_id: user.id,
    })) || []),
  ];

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically open file selector
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file); // Handle file (e.g., upload or preview)
    }
  };

  return (
    <MainDiv>
      <Header>
        <Title>Teamcamp</Title>
        <Icon
          iconName={'modal-close-icon'}
          iconSize={'12'}
          iconViewBox={'0 0 12 12'}
          onClick={onClose}
          size={true}
        />
      </Header>
      <CenterDiv>
        <Input placeholder='Task Title' />
        <TextArea placeholder='Add Description.... ' />
      </CenterDiv>
      <BottomSection>
        <BottomLeftSection>
          <AssigneeDropdown
            onClick={handleAssignTag}
            dropdownOpen={assignDropdown}
            onClose={() => setAssignDropdown(false)}
            items={assignItem}
            onChange={() => {}}
            isActive={true}
            iconSize='20'
          />
          <DropDownWithTag
            onClick={handlePriorityTag}
            title={'Priority'}
            iconName={`priority-${priority || 'NONE'}`}
            dropdownOpen={priorityDropdown}
            onClose={() => setPriorityDropdown(false)}
            items={priorityItem}
            onChange={() => {}}
            selectedValue={{ name: priority || 'NONE' }}
            isTag={true}
            isActive={true}
          />
        </BottomLeftSection>
        <BottomLeftSection>
          {/* Hidden file input */}
          <input
            type='file'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Icon
            iconName={'attachment-icon'}
            iconSize={'12'}
            iconViewBox={'0 0 12 12'}
            size={true}
            onClick={handleAttachmentClick}
          />
          <Button title='Create task' className='button' variant='small' />
        </BottomLeftSection>
      </BottomSection>
    </MainDiv>
  );
}

export default CreateTaskModal;
