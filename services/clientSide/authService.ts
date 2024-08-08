/* eslint-disable no-undef */
import axios from 'axios';
import { signInWithCode } from '../serverSide/membership/signin';
import { isValidEmail } from '@/helpers/common';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { userStore } from '@/stores/userStore';

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
    alert(err.message);
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
    alert(err.message);
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
    alert('Incorrect code!');
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
    if (result) alert('New code sent!');
    return true;
  } catch (err: any) {
    alert(err.message);
    return false;
  } finally {
    userStore.setLoading(false);
  }
};
