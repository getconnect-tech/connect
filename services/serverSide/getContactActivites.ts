import axios from 'axios';

const userActivityURL = 'https://amplitude.com/api/2/useractivity';
const userRearchURL = 'https://amplitude.com/api/2/usersearch';
const amplitudeAPIKey = process.env.AMPLITUDE_API_KEY;
const amplitudeSecretKey = process.env.AMPLITUDE_SECRET_KEY;

if (!amplitudeAPIKey) {
  throw new Error('Please define `AMPLITUDE_API_KEY` in .env');
}
if (!amplitudeSecretKey) {
  throw new Error('Please define `AMPLITUDE_SECRET_KEY` in .env');
}

const auth = Buffer.from(`${amplitudeAPIKey}:${amplitudeSecretKey}`).toString(
  'base64',
);
const headers = {
  Authorization: `Basic ${auth}`,
  'Content-Type': 'application/json',
};

export const getContactActivites = async (userID: string) => {
  try {
    const userInfomation = await axios.get(`${userRearchURL}?user=${userID}`, {
      headers,
    });

    const amplitudeId = userInfomation.data.matches[0]?.amplitude_id;
    if (!amplitudeId) {
      throw new Error('Amplitude ID not found for the given user');
    }

    const userActivity = await axios.get(
      `${userActivityURL}?user=${amplitudeId}`,
      {
        headers,
      },
    );

    const filteredEvents = userActivity.data.events.map((event: any) => ({
      event_id: event.event_id,
      event_type: event.event_type,
      event_time: event.event_time,
    }));
    console.log('User Activity Data:', filteredEvents);
    return filteredEvents;
  } catch (error) {
    console.error('Error fetching user activity:', error);
    throw error;
  }
};
