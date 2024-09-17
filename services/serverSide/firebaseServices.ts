import { Attachment } from 'postmark';
import { storage } from '@/lib/firebaseAdmin';
import { createStreamFromBuffer } from '@/helpers/common';

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
