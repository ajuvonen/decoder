import {AtomEffect} from 'recoil';

/**
 * Effect that persists atom data to local storage on change
 * @param {string} key Local storage key
 * @returns {AtomEffect<T>} LocalStorage effect for Recoil atom
 */
export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) =>
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue))
    );
  };
