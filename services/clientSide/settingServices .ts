/* eslint-disable no-undef */
import axios from 'axios';
import { workspaceStore } from '@/stores/workspaceStore';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { getAPIErrorMessage } from '@/helpers/common';

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

/**
 * @desc Update label details
 * @param {*} labelId
 * @param {*} payload { "name": "new name", "icon": "new icon","color":"new color" }
 */
export const updateLabelDetails = async (labelId: string, payload: object) => {
  try {
    workspaceStore.setLoading(true);
    const response = await axios.put(
      `${NEXT_PUBLIC_API_URL}/workspaces/labels/${labelId}`,
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

/*
 * @desc Delete label
 * @param {*} labelId
 */
export const deleteLabel = async (labelId: string) => {
  try {
    workspaceStore.setLoading(true);
    const result = await axios.delete(
      `${NEXT_PUBLIC_API_URL}/workspaces/labels/${labelId}`,
    );
    if (result) alert('Label Deleted');
    return true;
  } catch (err: any) {
    alert(getAPIErrorMessage(err) || 'Something went wrong!');
    return false;
  } finally {
    workspaceStore.setLoading(false);
  }
};
