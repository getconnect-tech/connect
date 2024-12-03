import { NextRequest } from 'next/server';
import errorMessages from '@/global/errorMessages';
import { sendVerificationCode } from '@/helpers/emails';
import { handleApiError } from '@/helpers/errorHandler';
import { emailSchema } from '@/lib/zod/common';
import { isUserAlreadyExists } from '@/services/serverSide/membership/signup';

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    emailSchema.parse(email);

    const normalizedEmail = email.toLowerCase() as string;

    const isValidEmail = await isUserAlreadyExists(normalizedEmail, false);
    if (!isValidEmail) {
      return Response.json(
        { error: errorMessages.ACCOUNT_DOES_NOT_EXISTS },
        { status: 404 },
      );
    }

    // Send verification code to user
    const messageId = await sendVerificationCode(normalizedEmail);

    return Response.json(
      { message: 'Verification code sent!', messageId },
      { status: 200 },
    );
  } catch (err: any) {
    return handleApiError(err);
  }
};
