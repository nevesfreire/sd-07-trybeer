import { useCallback, useContext, useEffect } from 'react';
import { GlobalContext } from '../services';
import { handleStorage } from '../utils';

export default function useLocalStorage(key) {
  const { storage, setStorage } = useContext(GlobalContext);

  const update = useCallback((callback) => {
    if (typeof callback === 'function') {
      const newStorage = handleStorage.get(key);
      const newDate = callback(newStorage);
      handleStorage.set(key, newDate);
      setStorage(newDate);
    } else {
      handleStorage.set(key, callback);
      setStorage(callback);
    }
  }, [key, setStorage]);

  useEffect(() => {
    setStorage(() => handleStorage.get(key) || {});
  }, [key, setStorage]);

  return [storage, update];
}
