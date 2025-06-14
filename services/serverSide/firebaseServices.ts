import { Attachment } from 'nodemailer/lib/mailer';
import { getDownloadURL } from 'firebase-admin/storage';
import type { File } from '@google-cloud/storage';
import { storage } from '@/lib/firebaseAdmin';
import { createStreamFromBuffer, remoteFileToBase64 } from '@/helpers/common';
import { MessageAttachment } from '@/utils/dataTypes';
import { WebhookAttachment } from '@/utils/webhookPayloadType';

const bucket = storage.bucket();

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

export const uploadWebhookAttachments = async (
  workspaceId: string,
  ticketId: string,
  messageId: string,
  attachments: WebhookAttachment[],
) => {
  const formattedAttachments: Promise<Attachment>[] = attachments.map(
    (attachment) => {
      // download the attachment from url
      return remoteFileToBase64(attachment.url).then((base64) => {
        return {
          cid: attachment.content_id,
          filename: attachment.filename,
          content: base64,
          contentType: attachment.content_type,
        };
      });
    },
  );

  const attachmentsToUpload = await Promise.all(formattedAttachments);

  return uploadAttachments(
    workspaceId,
    ticketId,
    messageId,
    attachmentsToUpload,
  );
};

export const uploadAttachments = async (
  workspaceId: string,
  ticketId: string,
  messageId: string,
  attachments: Attachment[],
) => {
  const filePath = `workspaces/${workspaceId}/tickets/${ticketId}/messages/${messageId}/attachments/`;
  const filesPromises = attachments.map(
    ({ filename, content, contentType, cid }) =>
      uploadFile({
        fileName: `${cid}+` + filename,
        filePath,
        content: content as string,
        contentType: contentType as string,
      }),
  );

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

export const extractFileDetails = (file: File) => {
  const args = file.name.split('/');
  const fileNameFull = args.at(-1)!.split('+');
  const contentId = fileNameFull.shift()!;
  const fileName = fileNameFull.join('+');
  const messageId = args.at(-3)!;

  return { contentId, fileName, messageId };
};

export const getTicketAttachments = async (
  workspaceId: string,
  ticketId: string,
) => {
  const folderPath = `workspaces/${workspaceId}/tickets/${ticketId}/messages`;

  const [files] = await bucket.getFiles({
    prefix: folderPath,
    autoPaginate: false,
  });

  const messageAttachmentsMap = {} as Record<string, MessageAttachment[]>;

  const messageAttachmentsPromises = files.map(async (file) => {
    const { contentId, fileName, messageId } = extractFileDetails(file);

    const downloadUrl = await getDownloadURL(file);
    return {
      messageId,
      attachment: {
        fileName,
        contentId,
        size: `${file.metadata.size}`,
        contentType: file.metadata.contentType!,
        downloadUrl,
      },
    };
  });

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

export const getAttachmentsFromToken = async (
  workspaceId: string,
  ticketId: string,
  attachmentToken: string,
) => {
  const attachmentsFolder = `workspaces/${workspaceId}/tickets/${ticketId}/temp/${attachmentToken}/attachments/`;

  const [files] = await bucket.getFiles({ prefix: attachmentsFolder });

  const attachments: Attachment[] = [];

  for (const file of files) {
    const fileNameFull = file.name.split('/').at(-1)!.split('+');
    const contentId = fileNameFull.length > 1 ? fileNameFull.shift()! : '';
    const fileName = fileNameFull.join('+');

    const contents = await file.download();
    const fileString = contents[0].toString('base64');

    const attachment = {
      cid: contentId,
      content: fileString,
      filename: fileName,
      contentType: file.metadata.contentType!,
    };

    if (attachment.content.length > 0) {
      attachments.push(attachment);
    }
  }

  return attachments;
};
