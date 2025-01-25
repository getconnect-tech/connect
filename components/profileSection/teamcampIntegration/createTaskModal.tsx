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
import ProsemirrorEditor from '@/components/prosemirror';
import FileCard from '@/components/fileCard/fileCard';
import { MessageAttachment } from '@/utils/appTypes';

interface Props {
  onClose: () => void;
}

function CreateTaskModal({ onClose }: Props) {
  const [assignDropdown, setAssignDropdown] = useState(false);
  const [priorityDropdown, setPriorityDropdown] = useState(false);
  const [description, setDescription] = useState(''); // State for the description
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for file input
  const editorRef = useRef<any>(null);
  const [commentValue, setCommentValue] = useState<string>('');
  const [attachFile, setAttachFiels] = useState<MessageAttachment[]>([]);

  const { workspaceStore, ticketStore, appStore } = useStores();
  const { currentWorkspace } = workspaceStore || {};
  const { ticketDetails } = ticketStore || {};
  const { priority } = ticketDetails || {};
  const { uploadLoading } = appStore || {};

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
