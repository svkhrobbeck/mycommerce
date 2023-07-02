import { TypeSearchParams } from "../interfaces";

const getUrlParams = (key: string, value: number | string, searchParams: TypeSearchParams, ...forDelete: string[]) => {
  searchParams.set(key, value);

  forDelete.forEach(param => searchParams.delete(param));

  return searchParams;
};

export default getUrlParams;
