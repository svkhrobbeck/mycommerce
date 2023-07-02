import { IProduct } from "../interfaces";

const findFilteredObjects = (arr: IProduct[], keys: number[]) => {
  const total: IProduct[] = [];

  keys.forEach(key => {
    let res = arr?.filter(item => item?.id === key);
    total.push(...res);
  });

  console.log(total);

  return total;
};

export default findFilteredObjects;
