'use server';
import { User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export const getSessionDetails = async () => {
  const session: { user: User } | null = await getServerSession(authOptions);
  return session;
};
