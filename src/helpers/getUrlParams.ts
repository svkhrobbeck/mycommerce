import { TypeSearchParams } from "../interfaces";

const getUrlParams = (key: string, value: string, searchParams: TypeSearchParams[0], ...forDelete: string[]) => {
  searchParams.set(key, value);

  forDelete.forEach(param => searchParams.delete(param));

  return searchParams;
};

export default getUrlParams;
