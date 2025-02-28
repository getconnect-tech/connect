import React, { useCallback, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { PriorityLevels } from '@prisma/client';
import Icon from '@/components/icon/icon';
import { MessageAttachment } from '@/utils/appTypes';
import AssigneeDropdown from '@/components/AssigneeDropdown/dropDownWithTag';
import { useStores } from '@/stores';
import DropDownWithTag from '@/components/dropDownWithTag/dropDownWithTag';
import { priorityItem } from '@/helpers/raw';
import Button from '@/components/button/button';
import ProsemirrorEditor from '@/components/prosemirror';
import FileCard from '@/components/fileCard/fileCard';
import { createTask, getUserList } from '@/services/clientSide/teamcampService';
import {
  PRIORITY_ICON_NAMES,
  TASK_PRIORITY,
  TASK_PRIORITY_LABELS,
} from '@/global/constants';
import {
  BottomLeftSection,
  BottomSection,
  CenterDiv,
  Header,
  Input,
  MainDiv,
  Title,
} from './styles';

interface Props {
  onClose: () => void;
}

function CreateTaskModal({ onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [assignDropdown, setAssignDropdown] = useState(false);
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [description, setDescription] = useState('');
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [attachFile, setAttachFiles] = useState<MessageAttachment[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<any>(null);

  const { appStore, teamcampStore } = useStores();
  const { projectUsers, taskCreateInput } = teamcampStore || {};
  const { uploadLoading } = appStore || {};

  const loadData = useCallback(async () => {
    try {
      if (projectUsers.length === 0) await getUserList();
    } catch (err) {
      console.log('error', err);
    }
  }, [projectUsers]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAssignTag = useCallback(() => {
    setAssignDropdown((prev) => !prev);
  }, []);

  const handlePriorityTag = useCallback(() => {
    setPriorityDropdown((prev) => !prev);
    setAssignDropdown(false);
  }, []);

  const assignItem = [
    { name: 'Unassigned', icon: 'dropdown-unassign-icon' },
    ...(projectUsers?.map((user) => ({
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
      // Append file name to the description
      setDescription((prev) => `${prev}\nAttached file: ${file.name}`);
    }
  };

  const onChangeAssign = useCallback(
    (item: { user_id: string }) => {
      teamcampStore.updateTaskCreateInput('taskUsers', [item.user_id]);
    },
    [teamcampStore],
  );

  const onChangePriority = useCallback(
    (item: { value: PriorityLevels }) => {
      teamcampStore.updateTaskCreateInput(
        'priority',
        TASK_PRIORITY[item.value],
      );
    },
    [teamcampStore],
  );

  const handleCreateTask = useCallback(async () => {
    try {
      setLoading(true);
      await createTask(taskCreateInput);
      onClose();
      teamcampStore.clearTaskCreateInput();
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  }, [onClose, taskCreateInput, teamcampStore]);

  return (
    <MainDiv>
      <Header>
        <Title>Teamcamp</Title>
        <Icon
          iconName={'modal-close-icon'}
          iconSize={'12'}
          iconViewBox={'0 0 12 12'}
          onClick={() => {
            onClose();
            teamcampStore.clearTaskCreateInput();
          }}
          size={true}
        />
      </Header>
      <CenterDiv>
        <Input
          value={taskCreateInput?.taskName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            teamcampStore.updateTaskCreateInput('taskName', e.target.value);
          }}
          placeholder='Task Title'
        />
        <ProsemirrorEditor
          ref={editorRef}
          valueContent={taskCreateInput?.description}
          setValueContent={(value: string) => {
            teamcampStore.updateTaskCreateInput('description', value);
          }}
          placeholder='Add Description.... '
          className='prosemirror-commentbox'
        />
        <div className='attach-file-div'>
          {attachFile?.map((fileData, index: number) => (
            <FileCard
              key={index}
              documentText={fileData?.fileName || 'Uploaded file'}
              fileSize={`${fileData?.size}`}
              fileName={fileData?.fileName}
              url={fileData?.downloadUrl}
              type={fileData?.contentType}
            />
          ))}
        </div>
        {uploadLoading !== null && (
          <p className='loading-text'>
            Loading...({Math.floor(uploadLoading)}%)
          </p>
        )}
      </CenterDiv>
      <BottomSection>
        <BottomLeftSection>
          <AssigneeDropdown
            onClick={handleAssignTag}
            dropdownOpen={assignDropdown}
            onClose={() => setAssignDropdown(false)}
            items={assignItem}
            onChange={onChangeAssign}
            isActive={true}
            iconSize='20'
            selectedValue={projectUsers?.find(
              (user) => user.id === taskCreateInput?.taskUsers?.[0],
            )}
          />
          <DropDownWithTag
            onClick={handlePriorityTag}
            title={'Priority'}
            iconName={`priority-${PRIORITY_ICON_NAMES[taskCreateInput.priority] || 'NONE'}`}
            dropdownOpen={priorityDropdown}
            onClose={() => setPriorityDropdown(false)}
            items={priorityItem}
            onChange={onChangePriority}
            selectedValue={{
              name: TASK_PRIORITY_LABELS[taskCreateInput.priority] || 'NONE',
            }}
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
            iconName={'attach-icon'}
            iconSize={'12'}
            iconViewBox={'0 0 12 12'}
            size={true}
            onClick={handleAttachmentClick}
          />
          <Button
            onClick={handleCreateTask}
            title='Create task'
            className='button'
            variant='small'
            isLoading={loading}
          />
        </BottomLeftSection>
      </BottomSection>
    </MainDiv>
  );
}

export default observer(CreateTaskModal);
