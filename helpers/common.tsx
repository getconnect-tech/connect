import stream from 'stream';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { convert } from 'html-to-text';
import axios from 'axios';
import moment from 'moment';
import { app } from '@/utils/firebase';
import { workspaceStore } from '@/stores/workspaceStore';
import { messageStore } from '@/stores/messageStore';
import { appStore } from '@/stores/appStore';
import { Contact } from '@/utils/appTypes';

export function isEmpty(value: any) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  ) {
    return true;
  } else {
    return false;
  }
}

export const getUniqueId = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-4' +
    S4().substr(0, 3) +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
};

/**
 * @desc Formatting time based on ISOString
 * @param {*} isoString // Accepts string
 */
export const formatTime = (isoString: string) => {
  const now = moment(); // Current time
  const eventTime = moment(isoString); // Event time
  const diffInMinutes = now.diff(eventTime, 'minutes');

  if (diffInMinutes <= 0) {
    return 'Now';
  }

  // Format difference based on time range
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}h`;
  } else if (diffInMinutes < 10080) {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days}d`;
  } else if (diffInMinutes < 43200) {
    const weeks = Math.floor(diffInMinutes / 10080);
    return `${weeks}w`;
  } else {
    const months = Math.floor(diffInMinutes / 43200);
    return `${months}mon`;
  }
};

export const generateVerificationCode = (length = 5) => {
  let code = '';
  while (code.length < length) {
    const randomNum = Math.ceil(Math.random() * 10);
    code += `${randomNum}`;
  }
  return code;
};

/**
 * @desc Checks for valid email
 * @param {*} value // Accepts string
 */
export const isValidEmail = (value: any) => {
  // eslint-disable-next-line max-len
  const myRegEx =
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = myRegEx.test(value);
  return isValid ? true : false;
};

/**
 * @desc Convert string to capitalize
 * @param {*} value
 */
export function capitalizeString(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

/**
 * @desc Remove null and undefined fields from object
 * @param {Record<string, any>} obj
 */
export function removeNullUndefined(obj: Record<string, any>) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  }
}

/**
 * @desc Convert response error message
 * @param {Record<string, any>} obj
 */
export function getAPIErrorMessage(obj: Record<string, any>) {
  return obj?.response?.data?.error;
}

/**
 * @desc Generate random filename
 * @param
 */
export const generateRandomFilename = () => {
  let lastTimestamp = 0;
  let timestamp = Date.now();
  if (timestamp <= lastTimestamp) {
    timestamp = lastTimestamp + 1;
  }
  lastTimestamp = timestamp;
  return timestamp;
};

/**
 * @desc Convert file data to firebase URL
 * @param {Record<string, any>} file folderName
 */
export const getFirebaseUrlFromFile = async (
  file: any,
  folderName: string,
  fileName?: string,
) => {
  try {
    const promises = [];
    let profile;
    if (file) {
      const myPromise = new Promise(function (myResolve, myReject) {
        const storage = getStorage(app);
        const metadata = {
          contentType: file?.type,
        };
        const fileExtension = file?.name?.split('.').pop();
        const uniqueFilename = generateRandomFilename();
        const fullFilename = `${file?.name?.replace(/\.[^/.]+$/, '')}_${uniqueFilename}.${fileExtension}`;
        let pathName = '';
        if (
          !folderName?.startsWith('UserProfiles') &&
          !folderName?.startsWith('Contact-us')
        ) {
          const workspace = workspaceStore.currentWorkspace;
          pathName = `workspaces/${workspace?.id}/${folderName}`;
        } else {
          pathName = folderName;
        }
        const storageRef = ref(
          storage,
          `${pathName}/${fileName ? fileName : fullFilename}`,
        );
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (!folderName?.startsWith('Contact-us'))
              appStore.setUploadLoading(progress);
          },
          (error) => {
            myReject(error);
            console.log('error', error);
            messageStore.setErrorMessage('Getting error for upload file');
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              profile = downloadURL;
              myResolve(profile);
            });
          },
        );
      });
      promises.push(myPromise);
    }
    try {
      await Promise.all(promises);
      return profile;
    } catch (e) {
      messageStore.setErrorMessage(`${e}`);
    }
  } catch (e) {
    messageStore.setErrorMessage(`Getting error for upload file ${e}`);
  }
};

export const generateApiKey = () => {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const apiKeyParts: string[] = [];

  for (let i = 0; i < 4; i++) {
    let apiKeyPart = '';

    for (let j = 0; j < 5; j++) {
      const randomIndex = Math.floor(Math.random() * alphabets.length);
      apiKeyPart += alphabets[randomIndex];
    }

    apiKeyParts.push(apiKeyPart);
  }
  const apiKey = apiKeyParts.join('-');

  return apiKey;
};

/**
 * @desc Convert base64 file contents into passthrough stream
 * @param {stream} contents base64 file contents
 */
export const createStreamFromBuffer = (contents: string) => {
  const fileBuffer = Buffer.from(contents, 'base64');

  const passthroughStream = new stream.PassThrough();
  passthroughStream.write(fileBuffer);
  passthroughStream.end();

  return passthroughStream;
};

export const formatFileSize = (sizeInBytes: number): string => {
  const kb = 1024;
  const mb = kb * 1024;
  const gb = mb * 1024;

  if (sizeInBytes >= gb) {
    return (sizeInBytes / gb).toFixed(2) + ' GB';
  } else if (sizeInBytes >= mb) {
    return (sizeInBytes / mb).toFixed(2) + ' MB';
  } else if (sizeInBytes >= kb) {
    return (sizeInBytes / kb).toFixed(2) + ' KB';
  } else {
    return sizeInBytes + ' Bytes';
  }
};

export const htmlToString = (html: string) => {
  const plainText = convert(html, { wordwrap: 130 });

  return plainText;
};

/**
 * Downloads a file from the given URL and converts it to a Base64 string.
 *
 * @param fileUrl - The URL of the file to download.
 * @returns A promise that resolves to the Base64 string of the downloaded file.
 */
export const downloadFileAsBase64 = async (fileUrl: string) => {
  const response = await axios.get(fileUrl, {
    responseType: 'arraybuffer', // Ensures response is returned as a Buffer
  });

  // Convert the response data (buffer) to a Base64 string
  const base64String = Buffer.from(response.data, 'binary').toString('base64');

  // Optionally, you can add a MIME type prefix to the base64 string for some use cases
  const mimeType = response.headers['content-type'];
  // return `data:${mimeType};base64,${base64String}`;

  return { contentType: mimeType, content: base64String };
};

// Helper function to generate a name from first and last name, or fallback to email
export const generateContactName = (
  update: Partial<Contact>,
  email: string,
) => {
  const nameParts: string[] = [];
  if (update.first_name) nameParts.push(update.first_name);
  if (update.last_name) nameParts.push(update.last_name);

  // Fallback to the email prefix if no name parts are available
  return nameParts.length > 0 ? nameParts.join(' ') : email.split('@')[0];
};
