import {useEffect, useState} from 'react';

/**
 * Persist a state value to local storage
 * @param {string} key Local storage key
 * @param {*} initialValue Value or function that returns the initial value
 * @returns {[<T>, React.Dispatch<React.SetStateAction<T>>]} Value and value setter
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }

    if (initialValue instanceof Function) {
      return (initialValue as () => T)();
    }

    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [T, typeof setValue];
};
