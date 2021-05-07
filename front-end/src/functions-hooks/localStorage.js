function setItem(key, value) {
  if (value === undefined) {
    value = '';
  }
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
}

function geItem(key) {
  const stringItem = window.localStorage.getItem(key);
  if (!stringItem) return undefined;
  const item = JSON.parse(stringItem);
  return item;
}

function removeItem() {
  window.localStorage.clear();
}

export default {
  setItem,
  geItem,
  removeItem,
};
