import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { messageStore } from '@/stores/messageStore';
import { getAPIErrorMessage } from '@/helpers/common';

/**
 * @desc get teamcamp tasks list
 */
export const getTasksList = async () => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/teamcamp/tasks`);
    const { data } = response;
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  }
};

/**
 * @desc create new task
 * @param {*} payload {
    "taskName": "Task name",
    "description": "Description",
    "priority": 1,
    "taskUsers": [],
    "files": []
}
 */
export const createTask = async (payload: object) => {
  try {
    const response = await axios.post(
      `${NEXT_PUBLIC_API_URL}/teamcamp/tasks`,
      payload,
    );
    const { data } = response;
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  }
};

/**
 * @desc get teamcamp user list
 */
export const getUserList = async () => {
  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/teamcamp/project/users`,
    );
    const { data } = response;
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  }
};
