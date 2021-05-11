const setUserLocalStorage = (data) => localStorage.setItem('user', JSON.stringify(data));

const getUserLocalStorage = () => JSON.parse(localStorage.getItem('user'));

const setCartLocalStorage = (data) => localStorage.setItem('cart', JSON.stringify(data));

const getCartLocalStorage = () => JSON.parse(localStorage.getItem('cart'));

const removeItemCart = () => localStorage.removeItem('cart');

export default {
  setUserLocalStorage,
  getUserLocalStorage,
  setCartLocalStorage,
  getCartLocalStorage,
  removeItemCart };
