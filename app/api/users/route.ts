import { isEmpty } from "@/helpers/common";
import { createUser, isUserAlreadyExists } from "@/services/membership/signup";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, displayName, profilePic } = await req.json();

    if (isEmpty(email)) {
      return Response.json({ error: "'email' is required in request body!" }, { status: 400 });
    }

    // Check if user already exists on database
    const isValidEmail = await isUserAlreadyExists(email);
    if (isValidEmail) {
      return Response.json({ error: "Account already exsists!" }, { status: 409 });
    }

    // if not create a new unverififed user
    const newUser = await createUser({ email, profilePic, displayName });

    return Response.json(newUser, { status: 201 });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};
