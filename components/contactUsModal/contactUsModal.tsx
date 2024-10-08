import React, { useCallback, useRef, useState } from 'react';
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
interface Props {
  isSuccessfull?: boolean;
  onClose: () => void;
}
function ContactUsModal({ isSuccessfull, onClose }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [success, setSuccess] = useState<boolean>(isSuccessfull || false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [contactText, setContactText] = useState<string>('');
  console.log('contactText', contactText);

  const handleIconClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const selectedFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      }
    },
    [],
  );

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prevFiles) => prevFiles?.filter((_, i) => i !== index));
  }, []);

  const handleSendMessage = useCallback(() => {
    // Simulate a successful message send
    setSuccess(true);
  }, []);

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
            <ProsemirrorEditor setValueContent={setContactText} />
            <input
              type='file'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              multiple={true}
            />
            {files.length > 0 && (
              <FileCardContainer>
                {files.map((file, index) => (
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
                      <h2>{file.name}</h2>
                      <p>{(file.size / 1024).toFixed(2)} KB</p>
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
                onClick={handleSendMessage}
                variant='medium'
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

export default ContactUsModal;
