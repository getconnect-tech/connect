import axios from 'axios';
import { AmplitudeUserSearchResponse } from '@/utils/dataTypes';

const API_KEY = process.env.AMPLITUDE_API_KEY!;
const SECRET_KEY = process.env.AMPLITUDE_SECRET_KEY!;

const authHeader = Buffer.from(`${API_KEY}:${SECRET_KEY}`, 'base64');

export const findUserByEmail = async (userEmail: string) => {
  const response = await axios.get(
    `https://amplitude.com/api/2/usersearch?user=${userEmail}`,
    {
      headers: {
        Authorization: `Basic ${authHeader}`,
      },
    },
  );

  const userSearchResults = response.data as AmplitudeUserSearchResponse;

  return userSearchResults.matches;
};

export const getUserActivities = async (amplitudeId: string | number) => {
  const response = await axios.get(
    `https://amplitude.com/api/2/useractivity?user=${amplitudeId}&direction=latest&limit=100`,
    {
      headers: {
        Authorization: `Basic ${authHeader}`,
      },
    },
  );

  const userActivityData = response.data;
  return userActivityData;
};
