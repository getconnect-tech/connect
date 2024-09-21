import * as OneSignal from 'onesignal-node';

const oneSignalAppId = process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID;
if (!oneSignalAppId) {
  throw new Error('Please define `NEXT_PUBLIC_ONESIGNAL_APP_ID` in .env');
}

const oneSignalRestApiKey = process.env.ONESIGNAL_REST_API_KEY;
if (!oneSignalRestApiKey) {
  throw new Error('Please define `ONESIGNAL_REST_API_KEY` in .env');
}

const oneSignalClient = new OneSignal.Client(
  oneSignalAppId,
  oneSignalRestApiKey,
);

export const sendOneSignalNotification = async (
  title: string,
  body: string,
  receiverUserIds: string[],
) => {
  const response = await oneSignalClient.createNotification({
    headings: {
      en: title,
    },
    contents: {
      en: body,
    },
    include_external_user_ids: receiverUserIds,
  });

  return response;
};
