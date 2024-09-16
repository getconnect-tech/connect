import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '@/utils/firebase';
import { workspaceStore } from '@/stores/workspaceStore';
import { messageStore } from '@/stores/messageStore';

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
export const getFirebaseUrlFromFile = async (file: any, folderName: string) => {
  try {
    const promises = [];
    let profile;
    if (file) {
      const myPromise = new Promise(function (myResolve, myReject) {
        const storage = getStorage(app);
        const metadata = {
          contentType: file?.type,
        };
        const fileExtension = file?.name.split('.').pop();
        const uniqueFilename = generateRandomFilename();
        const fullFilename = `${file?.name.replace(/\.[^/.]+$/, '')}_${uniqueFilename}.${fileExtension}`;
        let pathName = '';
        if (folderName !== 'UserProfiles') {
          const workspace = workspaceStore.currentWorkspace;
          pathName = `workspaces/${workspace?.id}/${folderName}`;
        } else {
          pathName = folderName;
        }
        const storageRef = ref(storage, pathName + fullFilename);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        uploadTask.on(
          'state_changed',
          () => {
            // const progress =
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
