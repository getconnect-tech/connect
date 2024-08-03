"use server";
import { authOptions } from "@/lib/authOptions";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

export const getSessionDetails = async () => {
  const session: { user: User } | null = await getServerSession(authOptions);
  return session;
};
