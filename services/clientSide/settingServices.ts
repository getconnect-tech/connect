/* eslint-disable no-undef */
import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { getAPIErrorMessage } from '@/helpers/common';
import { workspaceStore } from '@/stores/workspaceStore';

/**
 * @desc Get all API key
 * @param {*}
 */
export const getAPIKeys = async () => {
  try {
    workspaceStore.setLoading(true);
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/workspaces/apikeys`,
    );
    const { data } = response;
    if (data?.length > 0) {
      // workspaceStore.setAPIKeys(data);
      return data;
    }
    return data;
  } catch (err: any) {
    alert(getAPIErrorMessage(err) || 'Something went wrong!');
    return null;
  } finally {
    workspaceStore.setLoading(false);
  }
};

/**
 * @desc Add label
 * @param {*} payload { "name": "", "icon": "","color":"#7B7A79" }
 */
export const createLabel = async (payload: object) => {
  try {
    workspaceStore.setLoading(true);
    const response = await axios.post(
      `${NEXT_PUBLIC_API_URL}/workspaces/labels`,
      payload,
    );
    const { data } = response;
    return data;
  } catch (err: any) {
    alert(getAPIErrorMessage(err) || 'Something went wrong!');
    return null;
  } finally {
    workspaceStore.setLoading(false);
  }
};
