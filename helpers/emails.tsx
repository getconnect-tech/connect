import { ServerClient } from 'postmark';
import moment from 'moment';
import { generateVerificationCode } from './common';
import { prisma } from '@/prisma/prisma';
import { getTicketById } from '@/services/serverSide/ticket';

const client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!);

export const sendEmail = async ({ email, subject, body }: any) => {
  const res = await client.sendEmail({
    From: process.env.POSTMARK_SENDER_EMAIL!,
    To: email,
    Subject: subject,
    HtmlBody: body,
  });
  return res.MessageID;
};

export const sendEmailAsReply = async (ticketId: string, body: string) => {
  const ticket = await getTicketById(ticketId);

  if (!ticket) {
    return null;
  }

  const res = await client.sendEmail({
    From: process.env.POSTMARK_SENDER_EMAIL!,
    To: ticket.contact.email,
    Subject: ticket.title,
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
