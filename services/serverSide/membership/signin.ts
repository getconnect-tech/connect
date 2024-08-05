import { signIn } from 'next-auth/react';

export const signInWithCode = async (email: string, code: string) => {
  const response = await signIn('credentials', {
    email,
    code,
    redirect: false,
  });
  if (response?.ok) {
    return true;
  }
  throw new Error('Invalid verification code!');
};
