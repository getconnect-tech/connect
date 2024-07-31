import { prisma } from "@/prisma/prisma";
import { isUserAlreadyExists } from "@/services/membership/signup";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    const isValidEmail = await isUserAlreadyExists(email);

    if (isValidEmail) {
      return Response.json({ error: "Account Already Exsists!" }, { status: 409 });
    }

    return Response.json({ message: "Valid email address!" }, { status: 200 });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};
