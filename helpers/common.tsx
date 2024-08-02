export function isEmpty(value: any) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    return true;
  } else {
    return false;
  }
}

export const generateVerificationCode = (length = 5) => {
  let code = "";
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
  var myRegEx =
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
};
