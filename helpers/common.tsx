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
