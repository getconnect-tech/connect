import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { getAPIErrorMessage } from '@/helpers/common';
import { contactStore } from '@/stores/contactStore';
import { messageStore } from '@/stores/messageStore';

/**
 * @desc Get contact data
 * @param {*}
 */
export const getContactData = async () => {
  try {
    contactStore.setLoading(true);
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/contacts`);
    const { data } = response;
    // set contact data
    contactStore.setContacts(data);
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    contactStore.setLoading(false);
  }
};

/**
 * @desc Get contact data
 * @param {*}
 */
export const getAllGroup = async () => {
  try {
    contactStore.setLoading(true);
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/groups`);
    const { data } = response;
    // set contact data
    contactStore.setGroups(data);
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    contactStore.setLoading(false);
  }
};

/**
 * @desc Get contact groups
 * @param {*} contactId
 */
export const getContactGroup = async (contactId: string) => {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/contacts/${contactId}/groups`,
    );
    const { data } = response;
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    contactStore.setLoading(false);
  }
};
