import axios from 'axios';
import { AmplitudeEvent, AmplitudeUserSearchResponse } from '@/utils/dataTypes';
import { AMPLITUDE_API_KEY, AMPLITUDE_SECRET_KEY } from '@/helpers/environment';

const authHeader = Buffer.from(
  `${AMPLITUDE_API_KEY}:${AMPLITUDE_SECRET_KEY}`,
).toString('base64');

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

  const userActivityData = response.data.events as AmplitudeEvent[];
  return userActivityData;
};
