import { IAxiosData } from "../interfaces";

const errorToString = (obj: IAxiosData): string => {
  let text: string = `${obj.error}: `;

  text += `${obj.statusCode}! `;
  text += obj.message.join(", ");

  return text;
};

export default errorToString;
