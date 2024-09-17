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
  ticketId: string,
  messageId: string,
  attachments: Attachment[],
) => {
  const filePath = `/tickets/${ticketId}/messages/${messageId}/attachments/`;
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
