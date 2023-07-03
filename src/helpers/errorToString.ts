import { IAxiosData } from "../interfaces";

const errorToString = (obj: IAxiosData): string => {
  let text: string = `${obj.error}: `;

  text += `${obj.statusCode}! `;
  if (Array.isArray(obj.message)) text += obj.message.join(", ");
  else text += obj.message;

  return text;
};

export default errorToString;
