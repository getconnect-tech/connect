import { ServerClient } from 'postmark';
import moment from 'moment';
import { generateVerificationCode } from './common';
import { prisma } from '@/prisma/prisma';

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
