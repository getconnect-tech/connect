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

    // Check if user already exists on database
    const isValidEmail = await isUserAlreadyExists(normalizedEmail);
    if (!isValidEmail) {
      return Response.json(
        { error: errorMessages.ACCOUNT_DOES_NOT_EXISTS },
        { status: 404 },
      );
    }

    const messageId = await sendVerificationCode(normalizedEmail);

    return Response.json(
      { message: 'Verification code sent to user!', messageId },
      { status: 200 },
    );
  } catch (err: any) {
    return handleApiError(err);
  }
};
