/**
 * Load a value from localStorage
 * @param {string} key Key to find
 * @param {*} initialValue Initial value to use if not found
 * @returns {T} Parsed value or initial value
 */
export const loadLocalStorage = <T>(key: string, initialValue: T): T => {
  try {
    const rawValue = localStorage.getItem(key);
    if (rawValue) {
      return JSON.parse(rawValue);
    }

    return initialValue;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return initialValue;
  }
};

/**
 * Save a value to local storage
 * @param {string} key Key to save under
 * @param {object} data Data to stringify
 */
export const saveLocalStorage = <T>(key: string, data: T) => {
  localStorage.setItem(key, JSON.stringify(data));
};
