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
