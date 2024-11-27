import axios from 'axios';
import { signOut } from 'next-auth/react';
import { getAPIErrorMessage, isValidEmail } from '@/helpers/common';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { userStore } from '@/stores/userStore';
import { messageStore } from '@/stores/messageStore';
import UserPreferenceSingleton from '@/helpers/userPreferenceSingleton';
import { signInWithCode } from '../serverSide/membership/signin';

/**
 * @desc Verify user email
 * @param {*} email
 */
export const verifyUserEmail = async (email: string) => {
  try {
    userStore.setLoading(true);
    if (!isValidEmail(email)) {
      throw new Error('Invalid email address!');
    }
    const payload = { email };
    const response = await axios.post(
      `${NEXT_PUBLIC_API_URL}/auth/login`,
      payload,
    );
    if (response) {
      return true;
    }
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return false;
  } finally {
    userStore.setLoading(false);
  }
};

/**
 * @desc Gegister user details
 * @param {*} email name
 */
export const registerUser = async (email: string, name: string) => {
  try {
    userStore.setLoading(true);
    if (!isValidEmail(email)) {
      throw new Error('Invalid email address!');
    }
    const payload = { email, displayName: name };
    const response = await axios.post(
      `${NEXT_PUBLIC_API_URL}/auth/signup`,
      payload,
    );
    if (response) {
      return true;
    }
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return false;
  } finally {
    userStore.setLoading(false);
  }
};

/**
 * @desc Verify authentication code
 * @param {*} email code
 */
export const verifyAuthCode = async (email: string, code: string) => {
  try {
    userStore.setLoading(true);
    const result = await signInWithCode(email, code);
    if (result) return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: any) {
    messageStore.setErrorMessage(getAPIErrorMessage(err) || 'Incorrect code!');
    return false;
  } finally {
    userStore.setLoading(false);
  }
};

/**
 * @desc Resend verification code
 * @param {*} email
 */
export const resendVerificationCode = async (email: string) => {
  try {
    userStore.setLoading(true);
    const payload = { email };
    const result = await axios.post(
      `${NEXT_PUBLIC_API_URL}/auth/sendVerificationCode`,
      payload,
    );
    if (result) messageStore.setSuccessMessage('New code sent!');
    return true;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return false;
  } finally {
    userStore.setLoading(false);
  }
};

/**
 * @desc Logout user session
 * @param {*}
 */
export const logout = async () => {
  try {
    userStore.setLoading(true);
    const response = await signOut({ redirect: false });
    userStore.clearUserDetails();
    await UserPreferenceSingleton.getInstance().clearStoredUserData();
    return response;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return false;
  } finally {
    userStore.setLoading(false);
  }
};
