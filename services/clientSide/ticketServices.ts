/* eslint-disable no-undef */
import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { ticketStore } from '@/stores/ticketStore';
import { getAPIErrorMessage, isEmpty } from '@/helpers/common';

/**
 * @desc Get ticket list
 * @param {*}
 */
export const getTicketList = async () => {
  try {
    ticketStore.setLoading(true);
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/tickets`);
    const { data } = response;

    if (!data || data?.length === 0) {
      const mockData = [
        {
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
        },
        {
          id: '96882ab7-4b22-48cc-88a0-dd23d99ad9d6',
          workspace_id: '3e4b0b59-00af-4683-8158-b139925d38ff',
          title: 'I found bugin ticker generate message',
          contact_id: null,
          assigned_to: null,
          created_at: '2024-08-08T10:32:03.065Z',
          updated_at: '2024-08-08T10:32:03.065Z',
          priority: 'NONE',
          source: 'MAIL',
          mail_id:
            '<TY0PR06MB5625D47D4955E92645EB99E5C4B92@TY0PR06MB5625.apcprd06.prod.outlook.com>',
          sender_name: 'Aniket Ramani',
          sender_mail: 'aniket@pixer.digital',
        },
      ];
      ticketStore.setTicketList(data);
      return mockData;
    }
    // set ticket list in store
    ticketStore.setTicketList(data);
    return data;
  } catch (err: any) {
    alert(getAPIErrorMessage(err) || 'Something went wrong!');
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
    alert(getAPIErrorMessage(err) || 'Something went wrong!');
    return null;
  } finally {
    ticketStore.setLoading(false);
  }
};

/**
 * @desc Update ticket details
 * @param {*} ticketId
 */
export const updateTicketDetails = async (ticketId: any, payload: object) => {
  try {
    ticketStore.setLoading(true);
    const response = await axios.put(
      `${NEXT_PUBLIC_API_URL}/tickets/${ticketId}`,
      payload,
    );
    const { data } = response;

    // set ticket details in store
    ticketStore.setTicketDetails(data);
    return data;
  } catch (err: any) {
    alert(getAPIErrorMessage(err) || 'Something went wrong!');
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

    // set ticket details in store
    ticketStore.setTicketDetails(data);
    return data;
  } catch (err: any) {
    alert(getAPIErrorMessage(err) || 'Something went wrong!');
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
    alert(getAPIErrorMessage(err) || 'Something went wrong!');
    return null;
  } finally {
    ticketStore.setLoading(false);
  }
};
