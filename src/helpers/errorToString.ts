import { IAxiosData } from "../interfaces";

const errorToString = (obj: IAxiosData): string => {
  const keys: string[] = Object.keys(obj);

  let text: string = "Error message:";
  keys.forEach((key: string) => (text += ` ${obj[key]}`));
  return text;
};

export default errorToString;
