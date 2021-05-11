import { useState, useCallback } from 'react';
import { handleStorage } from '../utils';

export default function useLocalStorage(key) {
  const INITIAL_STATE = handleStorage.get(key) || {};
  const [value, setValue] = useState(INITIAL_STATE);

  const update = useCallback((callback) => {
    if (typeof callback === 'function') {
      const storage = handleStorage.get(key);
      const newDate = callback(storage);
      handleStorage.set(key, newDate);
      setValue(newDate);
    } else {
      handleStorage.set(key, callback);
      setValue(callback);
    }
  }, [key]);

  return [value, update];
}
