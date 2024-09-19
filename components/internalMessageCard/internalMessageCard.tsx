import React, { useCallback } from 'react';
import moment from 'moment';
import FileCard from '../fileCard/fileCard';
import {
  AddReactionButton,
  AttachmentMainDiv,
  Div,
  DownloadButton,
  Emoji,
  FileCardMainDiv,
  IconDiv,
  MainDiv,
  ReactionCard,
  ReactionsMainDiv,
  Title,
  TitleDiv,
} from './style';
import { MessageAttachment } from '@/utils/dataTypes';
import SVGIcon from '@/assets/icons/SVGIcon';

interface ReactionProps {
  emoji: string;
  count: number;
}
interface Props {
  title: string;
  time: Date;
  showReactions?: boolean;
  reactions: ReactionProps[];
  attachments?: MessageAttachment[];
}

export default function InternalMessageCard({
  time,
  title,
  showReactions,
  reactions,
  attachments = [],
}: Props) {
  const onClickDownloadAll = useCallback(() => {
    attachments.forEach((item) => {
      // eslint-disable-next-line no-undef
      if (item?.downloadUrl) window.open(item?.downloadUrl, '_blank');
    });
  }, [attachments]);
  return (
    <div>
      <MainDiv>
        <Div>
          <p>
            <div
              dangerouslySetInnerHTML={{ __html: title }}
              className='message'
            />
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
        {!showReactions && (
          <IconDiv className='emoji-icon'>
            <SVGIcon
              name='emoji-icon'
              width='12'
              height='12'
              viewBox='0 0 12 12'
            />
          </IconDiv>
        )}
      </MainDiv>
      {showReactions && (
        <ReactionsMainDiv>
          {reactions.map((reaction, index) => (
            <ReactionCard key={index}>
              <Emoji>{reaction.emoji}</Emoji>
              <p>{reaction.count}</p>
            </ReactionCard>
          ))}
          <AddReactionButton>
            <SVGIcon
              name='emoji-icon'
              width='12'
              height='12'
              viewBox='0 0 12 12'
            />
          </AddReactionButton>
        </ReactionsMainDiv>
      )}
    </div>
  );
}
