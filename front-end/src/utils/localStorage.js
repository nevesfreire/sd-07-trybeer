const setToLocalStorage = (key, payload) =>
  localStorage.setItem(key, JSON.stringify(payload));

const getToLocalStorage = (key) =>
  JSON.parse(localStorage.getItem(key));

// const setToLocalStorageShopCart = (shopCart) =>
//   localStorage.setItem('shopCart', JSON.stringify(shopCart));

const getToLocalStorageShopCart = () => {
  const shopCart = JSON.parse(localStorage.getItem('shopCart'));
  if (shopCart) {
    return shopCart;
  }
  return []
}

const clearLocalStorage = () => localStorage.clear();

export {
  setToLocalStorage,
  getToLocalStorage,
  getToLocalStorageShopCart,
  clearLocalStorage,
};
