import moment from 'moment';
import nodemailer from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';
import { nanoid } from 'nanoid';
import { prisma } from '@/prisma/prisma';
import { getTicketById } from '@/services/serverSide/ticket';
import { getContactById } from '@/services/serverSide/contact';
import { generateVerificationCode } from './common';
import {
  isDev,
  SENDER_EMAIL,
  SMTP_HOST,
  SMTP_PASS,
  SMTP_PORT,
  SMTP_USER,
} from './environment';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for 465, false for other ports
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

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
  const from = senderEmail ?? SENDER_EMAIL!;
  const referenceId = nanoid();

  await transporter.sendMail({
    from: from,
    to: email,
    subject: subject,
    html: body,
    attachments: attachments,
    headers: {
      'X-Tag-reference_id': referenceId,
    },
  });

  return referenceId;
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

  const from = senderEmail ?? SENDER_EMAIL!;
  const referenceId = nanoid();

  const contact = (await getContactById(ticket.contact_id))!;

  const res = await transporter.sendMail({
    from: from,
    to: contact.email,
    subject: ticket.subject,
    html: body,
    headers: [
      { key: 'In-Reply-To', value: ticket.mail_id },
      { key: 'X-Tag-reference_id', value: referenceId },
    ],
    attachments: attachments,
  });

  return res.messageId;
};

export const sendVerificationCode = async (email: string) => {
  const verificationCode = isDev ? '123456' : generateVerificationCode();

  const expiryTime = moment().add(5, 'minutes').toDate(); // expiry time for verification code

  await prisma.verificationToken.upsert({
    where: { email },
    create: { email, token: verificationCode, expires: expiryTime },
    update: { token: verificationCode, expires: expiryTime },
  });

  if (isDev) {
    return '858e89bc-68a8-456c-9b80-3a9ef4d05a8a';
  }

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
