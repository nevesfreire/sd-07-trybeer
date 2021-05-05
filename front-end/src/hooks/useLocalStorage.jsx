import { useState, useCallback } from 'react';
import { handleStorage } from '../utils';

export default function useLocalStorage(key) {
  const [value, setValue] = useState(handleStorage.get(key));

  const update = useCallback((newDate) => {
    handleStorage.set(key, newDate);
    setValue(newDate);
  }, [key]);

  return [value, update];
}
