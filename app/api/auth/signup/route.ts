import { NextRequest } from 'next/server';
import { z } from 'zod';
import errorMessages from '@/global/errorMessages';
import { sendVerificationCode } from '@/helpers/emails';
import { handleApiError } from '@/helpers/errorHandler';
import {
  createUser,
  isUserAlreadyExists,
} from '@/services/serverSide/membership/signup';
import { createStringSchema, parseAndValidateRequest } from '@/lib/zod';

const CreateRequestBody = z.object({
  email: createStringSchema('email', { email: true }),
  displayName: createStringSchema('displayName', {
    regex: /^[a-zA-Z ]{2,30}$/,
  }),
  profilePic: createStringSchema('profilePic', { url: true }).optional(),
});
export const POST = async (req: NextRequest) => {
  try {
    const { displayName, email, profilePic } = await parseAndValidateRequest(
      req,
      CreateRequestBody,
    );

    const normalizedEmail = email.toLowerCase();

    // Check if user already exists on database
    const isValidEmail = await isUserAlreadyExists(normalizedEmail);
    if (isValidEmail) {
      return Response.json(
        { error: errorMessages.ACCOUNT_EXISTS },
        { status: 409 },
      );
    }

    // if not create a new un-verified user
    await createUser({ email: normalizedEmail, profilePic, displayName });

    const messageId = await sendVerificationCode(normalizedEmail);

    return Response.json(
      { message: 'Verification code sent to user!', messageId },
      { status: 200 },
    );
  } catch (err: any) {
    return handleApiError(err);
  }
};
