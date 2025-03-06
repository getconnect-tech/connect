import { Attachment, ServerClient } from 'postmark';
import moment from 'moment';
import { prisma } from '@/prisma/prisma';
import { getTicketById } from '@/services/serverSide/ticket';
import { getContactById } from '@/services/serverSide/contact';
import { generateVerificationCode } from './common';
import { POSTMARK_SENDER_EMAIL, POSTMARK_SERVER_TOKEN } from './environment';

const client = new ServerClient(POSTMARK_SERVER_TOKEN!);

export const sendEmail = async ({
  email,
  subject,
  body,
  senderEmail,
  attachments = [],
}: {
  email: string;
  subject: string;
  body: string;
  senderEmail?: string;
  attachments?: Attachment[];
}) => {
  const from = senderEmail ?? POSTMARK_SENDER_EMAIL!;

  const res = await client.sendEmail({
    From: from,
    To: email,
    Subject: subject,
    HtmlBody: body,
    Attachments: attachments,
  });
  return res.MessageID;
};

export const sendEmailAsReply = async ({
  ticketId,
  body,
  senderEmail,
  attachments = [],
}: {
  ticketId: string;
  body: string;
  senderEmail?: string;
  attachments?: Attachment[];
}) => {
  const ticket = await getTicketById(ticketId);

  if (!ticket || !ticket.mail_id) {
    return null;
  }

  const from = senderEmail ?? POSTMARK_SENDER_EMAIL!;

  const contact = (await getContactById(ticket.contact_id))!;

  const res = await client.sendEmail({
    From: from,
    To: contact.email,
    Subject: ticket.subject,
    HtmlBody: body,
    Headers: [
      {
        Name: 'In-Reply-To',
        Value: ticket.mail_id,
      },
    ],
    Attachments: attachments,
  });

  return res.MessageID;
};

export const sendVerificationCode = async (email: string) => {
  const verificationCode = generateVerificationCode();

  const expiryTime = moment().add(5, 'minutes').toDate(); // expiry time for verification code

  await prisma.verificationToken.upsert({
    where: { email },
    create: { email, token: verificationCode, expires: expiryTime },
    update: { token: verificationCode, expires: expiryTime },
  });

  // Send verification code to user
  const messageId = await sendEmail({
    email,
    subject: 'Login - Verification Code',
    body: `<p>${verificationCode}</p>`,
  });
  return messageId;
};

export const sendInvitationEmail = async (
  email: string,
  workspaceName: string,
) => {
  const signupUrl = 'https://app.getconnect.tech/signup';

  const messageId = await sendEmail({
    email: email,
    subject: 'Workspace Invitation!',
    // eslint-disable-next-line max-len
    body: `<p>You have been invited to [${workspaceName}] workspace!</p><br /><a href="${signupUrl}" target="_blank">Sign Up!</a>`,
  });

  return messageId;
};
