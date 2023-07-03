import { CART_LOCALSTORAGE } from "../constants/constants";
import { IProduct } from "../interfaces";
import { setStorageStringify } from "./localStorage";

const toggleCart = (product: IProduct) => {
  const arr: IProduct[] = JSON.parse(localStorage.getItem(CART_LOCALSTORAGE) || "[]");
  const index = arr.findIndex(item => item.id === product.id);

  const newProduct = { ...product, count: 1 };

  if (!!arr.length) {
    if (index < 0) arr.push(newProduct);
    else arr.splice(index, 1);
  } else arr.push(newProduct);
  arr.sort((a, b) => Number(a.id) - Number(b.id));
  setStorageStringify(CART_LOCALSTORAGE, arr);

  return arr;
};

export default toggleCart;
