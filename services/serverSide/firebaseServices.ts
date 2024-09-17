import { Attachment } from 'postmark';
import { getDownloadURL } from 'firebase-admin/storage';
import { storage } from '@/lib/firebaseAdmin';
import { createStreamFromBuffer } from '@/helpers/common';
import { MessageAttachment } from '@/utils/dataTypes';

export const uploadFile = async ({
  fileName,
  filePath,
  content,
}: {
  fileName: string;
  filePath: string;
  content: string;
  contentType: string;
}) => {
  const bucket = storage.bucket();

  const targetFile = bucket.file(filePath + fileName);

  const passthroughStream = createStreamFromBuffer(content);

  const results = await new Promise<typeof targetFile>((resolve, reject) => {
    passthroughStream
      .pipe(targetFile.createWriteStream())
      .on('finish', () => {
        resolve(targetFile);
      })
      .on('error', (err) => reject(err));
  });

  return results;
};

export const uploadAttachments = async (
  workspaceId: string,
  ticketId: string,
  messageId: string,
  attachments: Attachment[],
) => {
  const filePath = `workspaces/${workspaceId}/tickets/${ticketId}/messages/${messageId}/attachments/`;
  const filesPromises = [];

  for (const attachment of attachments) {
    const { Name, Content, ContentType, ContentID } = attachment;
    const fileName = ContentID + Name;

    const uploadFilePromise = uploadFile({
      fileName,
      filePath,
      content: Content,
      contentType: ContentType,
    });

    filesPromises.push(uploadFilePromise);
  }

  const files = await Promise.all(filesPromises);

  return files;
};

export const moveAttachments = async (
  workspaceId: string,
  ticketId: string,
  messageId: string,
  attachmentToken: string,
) => {
  const tempFolder = `workspaces/${workspaceId}/tickets/${ticketId}/temp/${attachmentToken}`;
  const tempFolderPath = tempFolder + `/attachments/`;
  const destinationPath = `workspaces/${workspaceId}/tickets/${ticketId}/messages/${messageId}/attachments/`;

  const bucket = storage.bucket();

  const [files] = await bucket.getFiles({ prefix: tempFolderPath });

  const filesPromises = [];
  for (const file of files) {
    const fileName = file.name.split('/').pop();
    filesPromises.push(file.move(destinationPath + fileName));
  }

  const movedResponses = await Promise.all(filesPromises);

  await bucket.deleteFiles({ prefix: tempFolder });

  return movedResponses;
};

export const getTicketAttachments = async (
  workspaceId: string,
  ticketId: string,
) => {
  const bucket = storage.bucket();
  const folderPath = `workspaces/${workspaceId}/tickets/${ticketId}/messages`;

  const [files] = await bucket.getFiles({
    prefix: folderPath,
    autoPaginate: false,
  });

  const messageAttachmentsMap = {} as Record<string, MessageAttachment[]>;

  const messageAttachmentsPromises = [];

  for (const file of files) {
    const args = file.name.split('/');
    const fileNameFull = args.at(-1)!.split('+');
    const contentId = fileNameFull.shift()!;
    const fileName = fileNameFull.join('+');
    const messageId = args.at(-3)!;

    const attachmentPromise = new Promise<{
      messageId: string;
      attachment: MessageAttachment;
    }>((resolve, reject) => {
      getDownloadURL(file)
        .then((downloadUrl) =>
          resolve({
            messageId,
            attachment: {
              fileName,
              contentId,
              size: `${file.metadata.size}`,
              contentType: file.metadata.contentType!,
              downloadUrl: downloadUrl as any as string,
            },
          }),
        )
        .catch((err) => reject(err));
    });
    messageAttachmentsPromises.push(attachmentPromise);
  }

  const messageAttachments = await Promise.all(messageAttachmentsPromises);

  for (const messageAttachment of messageAttachments) {
    if (messageAttachmentsMap[messageAttachment.messageId]) {
      messageAttachmentsMap[messageAttachment.messageId].push(
        messageAttachment.attachment,
      );
    } else {
      messageAttachmentsMap[messageAttachment.messageId] = [
        messageAttachment.attachment,
      ];
    }
  }

  return messageAttachmentsMap;
};
