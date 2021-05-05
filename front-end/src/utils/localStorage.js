const setToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getToLocalStorage = () => JSON.parse(localStorage.getItem('user'));

const clearLocalStorage = () => {
  localStorage.clear();
};

export {
  setToLocalStorage,
  getToLocalStorage,
  clearLocalStorage,
};
