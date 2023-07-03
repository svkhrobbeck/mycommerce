import { IProduct } from "../interfaces";

export const setStorage = (key: string, value: string): void => localStorage.setItem(key, value);

export const getStorage = (key: string): string | null => localStorage.getItem(key);

export const getStorageParse = (key: string): IProduct[] | [] => JSON.parse(localStorage.getItem(key) || "[]");

export const setStorageStringify = (key: string, value: string | object | object[]): void =>
  localStorage.setItem(key, JSON.stringify(value));

export const removeStorage = (key: string): void => localStorage.removeItem(key);
