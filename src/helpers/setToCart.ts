import { CART_LOCALSTORAGE } from "../constants/constants";
import { getStorageParse, setStorageStringify } from "./localStorage";

const setToCart = (id: number) => {
  let keys: number[] = getStorageParse(CART_LOCALSTORAGE);

  if (keys.findIndex(item => item === id) < 0) {
    keys.push(id);
  } else {
    keys.splice(
      keys.findIndex(item => item === id),
      1
    );
  }

  keys.sort((a, b) => a - b);

  setStorageStringify(CART_LOCALSTORAGE, keys);

  return keys;
};

export default setToCart;
