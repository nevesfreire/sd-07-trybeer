const setStorage = (key, value) => localStorage.setItem(
  key, JSON.stringify(value),
);

const getStorage = (key) => JSON.parse(localStorage.getItem(key));

const clearStorage = () => localStorage.clear();

export {
  setStorage,
  getStorage,
  clearStorage,
}
