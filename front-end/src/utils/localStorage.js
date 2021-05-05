function get(key) {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}

function set(key, newDate) {
  if (newDate === undefined) {
    throw new Error('Valor undefined. LocalStorage não atualizado.');
  }
  if (typeof newDate !== 'string') {
    const value = JSON.stringify(newDate);
    return window.localStorage.setItem(key, value);
  }
  window.localStorage.setItem(key, newDate);
}

export default { set, get };
