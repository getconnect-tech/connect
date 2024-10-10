import React, { useCallback, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Icon from '../icon/icon';
import Button from '../button/button';
import ProsemirrorEditor from '../prosemirror';
import {
  FileCard,
  FileCardRight,
  IconDiv,
  RemoveIcon,
  ModalBottom,
  ModalDescription,
  ModalDiv,
  ModalHeader,
  ModalTitle,
  RightDiv,
  FileCardContainer,
  CloseIconDiv,
  SuccessfullModalDiv,
  IllustrationDiv,
  Content,
  ModalContant,
} from './style';
import SVGIcon from '@/assets/icons/SVGIcon';
import { createTicketViaWeb } from '@/services/clientSide/contactUsServices';
import { useStores } from '@/stores';
import { getFirebaseUrlFromFile } from '@/helpers/common';

interface AttachFile {
  file: File;
  url: string;
}
interface Props {
  isSuccessfull?: boolean;
  onClose: () => void;
}
function ContactUsModal({ isSuccessfull, onClose }: Props) {
  const [attachFiles, setAttachFiles] = useState<AttachFile[]>([]);
  const [success, setSuccess] = useState<boolean>(isSuccessfull || false);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [messageText, setMessageText] = useState<string>('');
  const { userStore } = useStores();
  const { user } = userStore;

  const handleIconClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const selectedFiles = Array.from(event.target.files);
        const fileURL = await getFirebaseUrlFromFile(
          selectedFiles,
          'Contact-us',
          selectedFiles[0]?.name,
        );
        if (fileURL) {
          setAttachFiles((prev) => [
            ...(prev || []),
            { file: selectedFiles[0], url: fileURL },
          ]);
        }
        // Reset input value
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    },
    [],
  );

  const handleRemoveFile = useCallback((index: number) => {
    setAttachFiles((prevFiles) => prevFiles?.filter((_, i) => i !== index));
  }, []);

  const handleSendMessage = useCallback(
    async (attachFileData: AttachFile[]) => {
      setLoading(true);
      try {
        const payload = {
          senderName: user?.display_name || '',
          senderEmail: user?.email || '',
          message: messageText,
          attachments:
            attachFileData?.length > 0
              ? attachFileData?.map((fileObj) => ({
                  filename: fileObj?.file.name,
                  url: fileObj?.url,
                }))
              : [],
        };
        await createTicketViaWeb(payload);
        setSuccess(true);
      } catch (err: any) {
        console.error('Error in send message', err);
      } finally {
        setLoading(false);
      }
    },
    [messageText],
  );

  return (
    <ModalDiv>
      {!success ? (
        <>
          <ModalHeader>
            <ModalTitle>Contact us</ModalTitle>
            <ModalDescription>
              You can also email us at support@connect.com
            </ModalDescription>
          </ModalHeader>
          <ModalContant>
            <ProsemirrorEditor
              setValueContent={setMessageText}
              placeholder={'How can we help you?'}
              className='contact-us'
            />
            <input
              type='file'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              multiple={true}
            />
            {attachFiles?.length > 0 && (
              <FileCardContainer>
                {attachFiles?.map((fileObj, index) => (
                  <FileCard key={index}>
                    <IconDiv>
                      <SVGIcon
                        name='file-icon'
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                      />
                    </IconDiv>
                    <FileCardRight>
                      <h2>{fileObj?.file.name}</h2>
                      <p>{(fileObj?.file.size / 1024).toFixed(2)} KB</p>
                    </FileCardRight>
                    <RemoveIcon onClick={() => handleRemoveFile(index)}>
                      <SVGIcon
                        name='cross-icon'
                        width='8'
                        height='8'
                        viewBox='0 0 16 16'
                      />
                    </RemoveIcon>
                    <Icon
                      iconName='cross-icon'
                      iconViewBox='0 0 16 16'
                      iconSize='12'
                      onClick={() => handleRemoveFile(index)}
                      className='close-icon'
                      size={true}
                    />
                  </FileCard>
                ))}
              </FileCardContainer>
            )}
          </ModalContant>
          <ModalBottom>
            <Icon
              iconName='attach-file-icon'
              iconSize='16'
              iconViewBox='0 0 17 16'
              onClick={handleIconClick}
            />
            <RightDiv>
              <Button
                title='Cancel'
                secondary={true}
                onClick={onClose}
                variant='medium'
              />
              <Button
                title='Send message'
                onClick={() => handleSendMessage(attachFiles)}
                variant='medium'
                isLoading={loading}
              />
            </RightDiv>
          </ModalBottom>
        </>
      ) : (
        <SuccessfullModalDiv>
          <IllustrationDiv>
            <SVGIcon
              name='successfull-icon'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            />
          </IllustrationDiv>
          <Content>
            <h2>Message Sent</h2>
            <p>We’ll be touch with you soon over email.</p>
          </Content>
          <CloseIconDiv>
            <Icon
              iconName='cross-icon'
              iconSize='12'
              iconViewBox='0 0 16 16'
              onClick={onClose}
              size={true}
            />
          </CloseIconDiv>
        </SuccessfullModalDiv>
      )}
    </ModalDiv>
  );
}

export default observer(ContactUsModal);
