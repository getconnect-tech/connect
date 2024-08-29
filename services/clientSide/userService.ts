import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { userStore } from '@/stores/userStore';
import { getAPIErrorMessage } from '@/helpers/common';
import { messageStore } from '@/stores/messageStore';

/**
 * @desc Update user details
 * @param {*} displayName
 */
export const updateUserDetails = async (payload: {
  displayName: string;
  profilePic: string | null;
}) => {
  try {
    userStore.setLoading(true);
    const result = await axios.put(`${NEXT_PUBLIC_API_URL}/user`, payload);
    if (result) messageStore.setSuccessMessage('User details updated');
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
 * @desc Get user details
 * @param {*}
 */
export const getUserDetails = async () => {
  try {
    userStore.setLoading(true);
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/user`);
    const { data } = response;
    // set user details
    userStore.setUserDetails(data);
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    userStore.setLoading(false);
  }
};
