import React, { useCallback } from 'react';
import moment from 'moment';
import FileCard from '../fileCard/fileCard';
import {
  AttachmentMainDiv,
  Div,
  DownloadButton,
  FileCardMainDiv,
  MainDiv,
  Title,
  TitleDiv,
} from './style';
import { MessageAttachment } from '@/utils/dataTypes';

interface Props {
  title: string;
  time: Date;
  attachments?: MessageAttachment[];
}

export default function InternalMessageCard({
  time,
  title,
  attachments = [],
}: Props) {
  const onClickDownloadAll = useCallback(() => {
    attachments.forEach((item) => {
      // eslint-disable-next-line no-undef
      if (item?.downloadUrl) window.open(item?.downloadUrl, '_blank');
    });
  }, [attachments]);

  return (
    <MainDiv>
      <Div>
        <p>
          <div dangerouslySetInnerHTML={{ __html: title }} />
          {attachments && attachments?.length > 0 && (
            <AttachmentMainDiv>
              <TitleDiv>
                <Title>{`${attachments?.length} Attachment${attachments?.length > 1 ? 's' : ''}`}</Title>
                <DownloadButton onClick={onClickDownloadAll}>
                  Download All
                </DownloadButton>
              </TitleDiv>
              <FileCardMainDiv>
                {attachments?.map((attachment, index) => (
                  <FileCard
                    key={index}
                    documentText={attachment.fileName}
                    fileSize={attachment.size}
                    fileName={attachment.fileName}
                    url={attachment.downloadUrl}
                  />
                ))}
              </FileCardMainDiv>
            </AttachmentMainDiv>
          )}
        </p>
        <span>{moment(time).fromNow()}</span>
      </Div>
    </MainDiv>
  );
}
