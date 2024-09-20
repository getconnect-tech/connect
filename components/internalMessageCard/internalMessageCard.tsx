import React from 'react';
import moment from 'moment';
import FileCard from '../fileCard/fileCard';
import { AttachmentMainDiv, Div, FileCardMainDiv, MainDiv } from './style';
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
  return (
    <MainDiv>
      <Div>
        <p>
          <div dangerouslySetInnerHTML={{ __html: title }} />
          {attachments && attachments?.length > 0 && (
            <AttachmentMainDiv>
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
