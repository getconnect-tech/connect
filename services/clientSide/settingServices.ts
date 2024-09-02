import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { getAPIErrorMessage } from '@/helpers/common';
import { settingStore } from '@/stores/settingStore';
import { messageStore } from '@/stores/messageStore';

/**
 * @desc Get all API key
 * @param {*}
 */
export const getAPIKeys = async () => {
  try {
    settingStore.setLoading(true);
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/workspaces/apikeys`,
    );
    const { data } = response;
    if (data?.length > 0) {
      settingStore.setAPIKeys(data);
      return data;
    }
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    settingStore.setLoading(false);
  }
};

/**
 * @desc  create API key
 * @param {*} payload { "title": "" }
 */
export const createAPIKey = async (payload: { name: string }) => {
  try {
    settingStore.setLoading(true);
    const response = await axios.post(
      `${NEXT_PUBLIC_API_URL}/workspaces/apikeys`,
      payload,
    );
    const { data } = response;
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    settingStore.setLoading(false);
  }
};

/**
 * @desc Get all labels
 * @param {*}
 */
export const getLabels = async () => {
  try {
    settingStore.setLoading(true);
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/workspaces/labels`,
    );
    const { data } = response;
    if (data?.length > 0) {
      settingStore.setLabels(data);
      return data;
    }
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    settingStore.setLoading(false);
  }
};

/**
 * @desc Add label
 * @param {*} payload { "name": "", "icon": "","color":"#7B7A79" }
 */
export const createLabel = async (payload: object) => {
  try {
    settingStore.setLoading(true);
    const response = await axios.post(
      `${NEXT_PUBLIC_API_URL}/workspaces/labels`,
      payload,
    );
    const { data } = response;
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    settingStore.setLoading(false);
  }
};

/**
 * @desc Update label details
 * @param {*} labelId
 * @param {*} payload { "name": "new name", "icon": "new icon","color":"new color" }
 */
export const updateLabelDetails = async (labelId: string, payload: object) => {
  try {
    settingStore.setLoading(true);
    const response = await axios.put(
      `${NEXT_PUBLIC_API_URL}/workspaces/labels/${labelId}`,
      payload,
    );
    const { data } = response;
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    settingStore.setLoading(false);
  }
};

/*
 * @desc Delete label
 * @param {*} labelId
 */
export const deleteLabel = async (labelId: string) => {
  try {
    settingStore.setLoading(true);
    const result = await axios.delete(
      `${NEXT_PUBLIC_API_URL}/workspaces/labels/${labelId}`,
    );
    if (result) messageStore.setSuccessMessage('Label Deleted');
    return true;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return false;
  } finally {
    settingStore.setLoading(false);
  }
};

/**
 * @desc  create macros
 * @param {*} payload { "title" , "content"}
 */
export const createMacros = async (payload: object) => {
  try {
    settingStore.setLoading(true);
    const response = await axios.post(`${NEXT_PUBLIC_API_URL}/macros`, payload);
    const { data } = response;
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    settingStore.setLoading(false);
  }
};

/**
 * @desc  update macros
 * @param {*} payload { "title" , "content"}
 */
export const updateMacros = async (macrosId: string, payload: object) => {
  try {
    settingStore.setLoading(true);
    const response = await axios.put(
      `${NEXT_PUBLIC_API_URL}/macros/${macrosId}`,
      payload,
    );
    const { data } = response;
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    settingStore.setLoading(false);
  }
};

/**
 * @desc  Delete macros
 * @param {*} macrosId
 */
export const deleteMacros = async (macrosId: string) => {
  try {
    settingStore.setLoading(true);
    const response = await axios.delete(
      `${NEXT_PUBLIC_API_URL}/macros/${macrosId}`,
    );
    const { data } = response;
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    settingStore.setLoading(false);
  }
};
