import { generateVerificationCode } from "@/helpers/common";
import { sendEmail } from "@/helpers/emails";
import { prisma } from "@/prisma/prisma";
import moment from "moment";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    const verificationCode = generateVerificationCode();

    const expiryTime = moment().add(5, "minutes").toDate(); // expiry time for verification code

    await prisma.verificationToken.upsert({
      where: { email },
      create: { email, token: verificationCode, expires: expiryTime },
      update: { token: verificationCode, expires: expiryTime },
    });

    // Send verification code to user
    const messageId = await sendEmail({ email, subject: "Login - Verification Code", body: `<p>${verificationCode}</p>` });

    return Response.json({ message: "Verification code sent!", messageId }, { status: 200 });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
};
