import * as OneSignal from 'onesignal-node';
import {
  NEXT_PUBLIC_ONESIGNAL_APP_ID,
  ONESIGNAL_REST_API_KEY,
} from '@/helpers/environment';

if (!NEXT_PUBLIC_ONESIGNAL_APP_ID) {
  throw new Error('Please define `NEXT_PUBLIC_ONESIGNAL_APP_ID` in .env');
}

if (!ONESIGNAL_REST_API_KEY) {
  throw new Error('Please define `ONESIGNAL_REST_API_KEY` in .env');
}

const oneSignalClient = new OneSignal.Client(
  NEXT_PUBLIC_ONESIGNAL_APP_ID,
  ONESIGNAL_REST_API_KEY,
);

export const sendOneSignalNotification = async (
  title: string,
  body: string,
  receiverUserIds: string[],
  url?: string,
) => {
  const response = await oneSignalClient.createNotification({
    headings: {
      en: title,
    },
    contents: {
      en: body,
    },
    include_external_user_ids: receiverUserIds,
    url,
  });

  return response;
};
