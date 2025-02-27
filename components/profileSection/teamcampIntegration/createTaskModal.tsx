import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/icon/icon';
import { MessageAttachment } from '@/utils/appTypes';
import AssigneeDropdown from '@/components/AssigneeDropdown/dropDownWithTag';
import { useStores } from '@/stores';
import DropDownWithTag from '@/components/dropDownWithTag/dropDownWithTag';
import { priorityItem } from '@/helpers/raw';
import Button from '@/components/button/button';
import ProsemirrorEditor from '@/components/prosemirror';
import FileCard from '@/components/fileCard/fileCard';
import { getUserList } from '@/services/clientSide/teamcampService';
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
  const [assignDropdown, setAssignDropdown] = useState(false);
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [description, setDescription] = useState('');
  const [commentValue, setCommentValue] = useState<string>('');
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [attachFile, setAttachFiles] = useState<MessageAttachment[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const editorRef = useRef<any>(null);

  const { ticketStore, appStore, teamcampStore } = useStores();
  const { projectUsers } = teamcampStore || {};
  const { ticketDetails } = ticketStore || {};
  const { priority } = ticketDetails || {};
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
      name: user.name || '',
      src: user.profile_photo || '',
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
        <ProsemirrorEditor
          ref={editorRef}
          valueContent={commentValue}
          setValueContent={setCommentValue}
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
            iconName={'attach-icon'}
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
