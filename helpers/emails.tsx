import { ServerClient } from 'postmark';
import moment from 'moment';
import { generateVerificationCode } from './common';
import { prisma } from '@/prisma/prisma';
import { getTicketById } from '@/services/serverSide/ticket';

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!);

export const sendEmail = async ({
  email,
  subject,
  body,
  senderEmail,
}: {
  email: string;
  subject: string;
  body: string;
  senderEmail?: string;
}) => {
  const from = senderEmail ?? process.env.POSTMARK_SENDER_EMAIL!;

  const res = await client.sendEmail({
    From: from,
    To: email,
    Subject: subject,
    HtmlBody: body,
  });
  return res.MessageID;
};

export const sendEmailAsReply = async ({
  ticketId,
  body,
  senderEmail,
}: {
  ticketId: string;
  body: string;
  senderEmail?: string;
}) => {
  const ticket = await getTicketById(ticketId);

  if (!ticket) {
    return null;
  }

  const from = senderEmail ?? process.env.POSTMARK_SENDER_EMAIL!;

  const res = await client.sendEmail({
    From: from,
    To: ticket.contact.email,
    Subject: ticket.subject,
    HtmlBody: body,
    Headers: [
      {
        Name: 'In-Reply-To',
        Value: ticket.mail_id,
      },
    ],
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
