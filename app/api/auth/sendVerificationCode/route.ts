import moment from 'moment';
import { NextRequest } from 'next/server';
import errorMessages from '@/global/errorMessages';
import { generateVerificationCode } from '@/helpers/common';
import { sendVerificationCode } from '@/helpers/emails';
import { handleApiError } from '@/helpers/errorHandler';
import { emailSchema } from '@/lib/zod/common';
import { prisma } from '@/prisma/prisma';
import { isUserAlreadyExists } from '@/services/serverSide/membership/signup';

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    emailSchema.parse(email);

    const isValidEmail = await isUserAlreadyExists(email, false);
    if (!isValidEmail) {
      return Response.json(
        { error: errorMessages.ACCOUNT_DOES_NOT_EXISTS },
        { status: 404 },
      );
    }

    const verificationCode = generateVerificationCode();

    const expiryTime = moment().add(5, 'minutes').toDate(); // expiry time for verification code

    await prisma.verificationToken.upsert({
      where: { email },
      create: { email, token: verificationCode, expires: expiryTime },
      update: { token: verificationCode, expires: expiryTime },
    });

    // Send verification code to user
    const messageId = await sendVerificationCode(email);

    return Response.json(
      { message: 'Verification code sent!', messageId },
      { status: 200 },
    );
  } catch (err: any) {
    return handleApiError(err);
  }
};
