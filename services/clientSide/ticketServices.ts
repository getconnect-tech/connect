import axios from 'axios';
import moment from 'moment';
import TicketCacheService from './ticketCacheServices';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { ticketStore } from '@/stores/ticketStore';
import { getAPIErrorMessage, isEmpty } from '@/helpers/common';
import { messageStore } from '@/stores/messageStore';
import { workspaceStore } from '@/stores/workspaceStore';

/**
 * @desc Get ticket list
 * @param {*}
 */
export const getTicketList = async () => {
  try {
    ticketStore.setLoading(true);

    const companyId = workspaceStore?.currentWorkspace?.id;
    const lastUpdatedTime =
      await TicketCacheService.getInstance()?.getLastUpdatedTime(companyId);
    const adjustedTime = moment().subtract(10, 'minutes').toISOString();

    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/tickets`, {
      params: { last_updated: lastUpdatedTime },
    });
    const { data } = response;

    // let hasUpdatedData = false;
    if (lastUpdatedTime === 0 || isEmpty(lastUpdatedTime)) {
      await TicketCacheService.getInstance().addBulk(data);
    } else {
      await TicketCacheService.getInstance().addBulk(data);
    }
    await TicketCacheService.getInstance().setLastUpdatedTime(
      adjustedTime,
      companyId,
    );
    const dataFromLocal = await TicketCacheService.getInstance().get();

    // set ticket list in store
    ticketStore.setTicketList(dataFromLocal);
    return dataFromLocal;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    ticketStore.setLoading(false);
  }
};

/**
 * @desc Get ticket details
 * @param {*} ticketId
 */
export const getTicketDetails = async (ticketId: string) => {
  try {
    ticketStore.setLoading(true);
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/tickets/${ticketId}`,
    );
    const { data } = response;

    if (!data || isEmpty(data)) {
      // Set mock data if not getting from API
      const mockData = {
        id: '746a45db-4ede-4ab6-959c-19d7b7cd9f47',
        workspace_id: '3e4b0b59-00af-4683-8158-b139925d38ff',
        title: 'Test message from gmail',
        contact_id: null,
        assigned_to: null,
        created_at: '2024-08-08T10:03:27.341Z',
        updated_at: '2024-08-08T10:03:27.341Z',
        priority: 'NONE',
        source: 'MAIL',
        mail_id:
          '<CAFYk3OX9wLATj+yVGmB_oSEqmNzgZEmqUEv6cq6ps65nghesxw@mail.gmail.com>',
        sender_name: 'Vatsal Ghoghari',
        sender_mail: 'vghoghari82@gmail.com',
      };
      ticketStore.setTicketList(data);
      return mockData;
    }
    // set ticket details in store
    ticketStore.setTicketDetails(data);
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    ticketStore.setLoading(false);
  }
};

/**
 * @desc Update ticket Priority
 * @param {*} ticketId
 */
export const updateTicketPriority = async (ticketId: any, payload: object) => {
  try {
    ticketStore.setLoading(true);
    const response = await axios.put(
      `${NEXT_PUBLIC_API_URL}/tickets/${ticketId}/changePriority`,
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
    ticketStore.setLoading(false);
  }
};

/**
 * @desc Get ticket messages
 * @param {*} ticketId
 */

export const getTicketMessages = async (ticketId: string) => {
  try {
    ticketStore.setLoading(true);
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/tickets/${ticketId}/messages`,
    );
    const { data } = response;
    if (data) {
      ticketStore.setTicketMessages(data);
      return data;
    }
    return false;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    ticketStore.setLoading(false);
  }
};

/**
 * @desc Change ticket status
 * @param {*} ticketId
 */
export const changeTicketStatus = async (ticketId: any, payload: object) => {
  try {
    ticketStore.setLoading(true);
    const response = await axios.put(
      `${NEXT_PUBLIC_API_URL}/tickets/${ticketId}/changeStatus`,
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
    ticketStore.setLoading(false);
  }
};

/**
 * @desc Snooze ticket
 * @param {*} ticketId
 */
export const snoozeTicket = async (ticketId: any, payload: object) => {
  try {
    ticketStore.setLoading(true);
    const response = await axios.put(
      `${NEXT_PUBLIC_API_URL}/tickets/${ticketId}/snooze`,
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
    ticketStore.setLoading(false);
  }
};

/**
 * @desc Update Assignee
 * @param {*} ticketId
 */
export const updateAssignee = async (ticketId: string, payload: object) => {
  try {
    ticketStore.setLoading(true);
    const response = await axios.put(
      `${NEXT_PUBLIC_API_URL}/tickets/${ticketId}/changeAssignee`,
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
    ticketStore.setLoading(false);
  }
};

/**
 * @desc Send message
 * @param {*} ticketId
 * @param {*} payload { "content": "Message content", "type": "REGULAR" }
 */
export const sendMessage = async (ticketId: string, payload: object) => {
  try {
    ticketStore.setLoading(true);
    const response = await axios.post(
      `${NEXT_PUBLIC_API_URL}/tickets/${ticketId}/messages`,
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
    ticketStore.setLoading(false);
  }
};

/**
 * @desc Add label into ticket
 * @param {*} ticketId
 * @param {*} labelId
 */
export const addLabelToTicket = async (ticketId: string, labelId: string) => {
  try {
    ticketStore.setLoading(true);
    const response = await axios.post(
      `${NEXT_PUBLIC_API_URL}/tickets/${ticketId}/labels/${labelId}`,
    );
    const { data } = response;
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    ticketStore.setLoading(false);
  }
};

/**
 * @desc Delete label from ticket
 * @param {*} ticketId
 * @param {*} labelId
 */
export const deleteLabelFromTicket = async (
  ticketId: string,
  labelId: string,
) => {
  try {
    ticketStore.setLoading(true);
    const response = await axios.delete(
      `${NEXT_PUBLIC_API_URL}/tickets/${ticketId}/labels/${labelId}`,
    );
    const { data } = response;
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    ticketStore.setLoading(false);
  }
};

/**
 * @desc Get ticket summary
 * @param {*} ticketId
 */
export const getTicketSummary = async (
  ticketId: string,
  aiConnected: boolean = false,
) => {
  try {
    if (!aiConnected) {
      ticketStore.setTicketSummary({
        ticketSummary: 'Connect AI is disabled',
        contactSentiment: '',
      });
      return null;
    }
    ticketStore.setLoading(true);
    const response = await axios.get(
      `${NEXT_PUBLIC_API_URL}/tickets/${ticketId}/generateSummary`,
    );
    const { data } = response;
    ticketStore.setTicketSummary(data);
    return data;
  } catch (err: any) {
    messageStore.setErrorMessage(
      getAPIErrorMessage(err) || 'Something went wrong!',
    );
    return null;
  } finally {
    ticketStore.setLoading(false);
  }
};

/**
 * @desc React message
 * @param {*} messageId
 * @param {*} payload { "reaction": "👍"}
 */
export const reactMessage = async (messageId: string, payload: object) => {
  try {
    ticketStore.setLoading(true);
    const response = await axios.post(
      `${NEXT_PUBLIC_API_URL}/messages/${messageId}/react`,
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
    ticketStore.setLoading(false);
  }
};
