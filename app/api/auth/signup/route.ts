import errorMessages from "@/global/errorMessages";
import { isEmpty } from "@/helpers/common";
import { sendVerificationCode } from "@/helpers/emails";
import { handleApiError } from "@/helpers/errorHandler";
import { createUser, isUserAlreadyExists } from "@/services/serverSide/membership/signup";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, displayName, profilePic } = await req.json();

    if (isEmpty(email)) {
      return Response.json({ error: errorMessages.EMAIL_IS_REQUIRED }, { status: 400 });
    }

    if (isEmpty(displayName)) {
      return Response.json({ error: errorMessages.DISPLAY_NAME_IS_REQUIRED }, { status: 400 });
    }

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
