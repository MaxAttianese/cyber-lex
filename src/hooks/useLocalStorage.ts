import { useCallback, useState } from 'react';

const readStorage = <T>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
};

/**
 * State persisted in LocalStorage. Writes are synchronous: returns `false`
 * if the browser rejects the save (e.g. quota exceeded).
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => readStorage(key, initialValue));

  const update = useCallback(
    (next: T): boolean => {
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
        setValue(next);
        return true;
      } catch (error) {
        console.error(`Unable to save "${key}" to LocalStorage`, error);
        return false;
      }
    },
    [key],
  );

  return [value, update] as const;
};
