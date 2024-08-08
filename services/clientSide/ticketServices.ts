/* eslint-disable no-undef */
import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '@/helpers/environment';
import { ticketStore } from '@/stores/ticketStore';

/**
 * @desc Get ticket list
 * @param {*}
 */
export const getTicketList = async () => {
  try {
    ticketStore.setLoading(true);
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/tickets`);
    const { data } = response;
    // set ticket list in store
    ticketStore.setTicketList(data);
    return data;
  } catch (err: any) {
    alert(err.message);
    return null;
  } finally {
    ticketStore.setLoading(false);
  }
};
