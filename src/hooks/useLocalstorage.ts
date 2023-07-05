import { IProduct } from "../interfaces";
import { CART_LOCALSTORAGE } from "../constants/constants";
import { getStorageParse, setStorageStringify } from "../helpers/localStorage";

const useLocalStorage = () => {
  let arr: IProduct[] = [];

  const toggle = (product: IProduct): IProduct[] => {
    arr = getStorageParse(CART_LOCALSTORAGE);
    const index = arr.findIndex(item => item.id === product.id);

    const newProduct = { ...product, count: 1 };

    if (!!arr.length) {
      if (index < 0) arr.push(newProduct);
      else arr.splice(index, 1);
    } else arr.push(newProduct);
    arr.sort((a, b) => Number(a.id) - Number(b.id));

    setStorageStringify(CART_LOCALSTORAGE, arr);

    console.log(arr);

    return arr;
  };

  const remove = (id: number): IProduct[] => {
    arr = getStorageParse(CART_LOCALSTORAGE);
    const index = arr.findIndex(item => item.id === id);
    arr.splice(index, 1);

    setStorageStringify(CART_LOCALSTORAGE, arr);

    return arr;
  };

  const add = (product: IProduct): IProduct[] => {
    arr = getStorageParse(CART_LOCALSTORAGE);
    const index = arr.findIndex(item => item.id === product.id);
    arr.splice(index, 1);
    arr.push(product);
    arr.sort((a, b) => Number(a.id) - Number(b.id));

    setStorageStringify(CART_LOCALSTORAGE, arr);

    return arr;
  };

  return { add, remove, toggle };
};

export default useLocalStorage;
