import { NextRequest } from 'next/server';
import { z } from 'zod';
import errorMessages from '@/global/errorMessages';
import { sendVerificationCode } from '@/helpers/emails';
import { handleApiError } from '@/helpers/errorHandler';
import { emailSchema } from '@/lib/zod/common';
import {
  createUser,
  isUserAlreadyExists,
} from '@/services/serverSide/membership/signup';
import { displayNameSchema, profilePicSchema } from '@/lib/zod/user';

const RequestBody = z.object({
  email: emailSchema,
  displayName: displayNameSchema,
  profilePic: profilePicSchema.optional(),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    RequestBody.parse(body);

    const { email, displayName, profilePic } = body as z.infer<
      typeof RequestBody
    >;
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
