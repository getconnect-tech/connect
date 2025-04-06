import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { getAPIErrorMessage } from '@/helpers/common';
import { contactStore } from '@/stores/contactStore';
import { messageStore } from '@/stores/messageStore';
import { workspaceStore } from '@/stores/workspaceStore';

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
export const getContactGroups = async (contactId: string) => {
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

/**
 * @desc Get contact detail by ID
 * @param {*}
 */
export const getContactDetailById = async (contactId: string) => {
  try {
    contactStore.setLoading(true);
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/contacts/${contactId}`,
      {
        headers: {
          workspace_id: workspaceStore.currentWorkspace?.id,
        },
      },
    );
    const { data } = response;
    contactStore.setContactDetails(data);
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
 * @desc Refresh contact information
 * @param {*} contactId
 */
export const refreshContact = async (contactId: string) => {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/contacts/${contactId}/refresh`,
    );
    const { data } = response;
    contactStore.setContactDetails(data);
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
