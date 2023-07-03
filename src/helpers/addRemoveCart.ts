import { CART_LOCALSTORAGE } from "../constants/constants";
import { IProduct } from "../interfaces";
import { getStorageParse, setStorageStringify } from "./localStorage";

export const removeFromCart = (id: number) => {
  let carts: IProduct[] = getStorageParse(CART_LOCALSTORAGE);
  const index = carts.findIndex(item => item.id === id);
  carts.splice(index, 1);

  setStorageStringify(CART_LOCALSTORAGE, carts);

  return carts;
};

export const addToCart = (product: IProduct) => {
  let carts: IProduct[] = getStorageParse(CART_LOCALSTORAGE);
  const index = carts.findIndex(item => item.id === product.id);
  carts.splice(index, 1);
  carts.push(product);
  carts.sort((a, b) => Number(a.id) - Number(b.id));

  setStorageStringify(CART_LOCALSTORAGE, carts);

  return carts;
};
