import errorMessages from "@/global/errorMessages";
import { isEmpty } from "@/helpers/common";
import { sendVerificationCode } from "@/helpers/emails";
import { handleApiError } from "@/helpers/errorHandler";
import { displayNameSchema, emailSchema, profilePicSchema } from "@/lib/zod";
import { createUser, isUserAlreadyExists } from "@/services/serverSide/membership/signup";
import { NextRequest } from "next/server";
import { z } from "zod";

const RequestBody = z.object({
  email: emailSchema,
  displayName: displayNameSchema,
  profilePic: profilePicSchema,
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    RequestBody.parse(body);

    const { email, displayName, profilePic } = body;

    // Check if user already exists on database
    const isValidEmail = await isUserAlreadyExists(email);
    if (isValidEmail) {
      return Response.json({ error: errorMessages.ACCOUNT_EXISTS }, { status: 409 });
    }

    // if not create a new un-verififed user
    await createUser({ email, profilePic, displayName });

    const messageId = await sendVerificationCode(email);

    return Response.json({ message: "Verification code sent to user!", messageId }, { status: 200 });
  } catch (err: any) {
    return handleApiError(err);
  }
};
