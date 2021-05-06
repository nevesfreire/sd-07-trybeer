const setStorage = (key, value) => localStorage.setItem(
  key, JSON.stringify(value),
);

const getStorage = (key) => JSON.parse(localStorage.getItem(key));

const clearStorage = () => localStorage.clear();

const calculateTotalProductsPrice = (cart) => {
  let updateTotalPrice = 0;
  cart.forEach((product) => {
    let productQuantity = product.quantity;
    if (!productQuantity) productQuantity = 0;
    const totalPrice = Math
      .round((Number(product.price) * 100) * productQuantity) / 100;
    updateTotalPrice += totalPrice;
  });
  return updateTotalPrice;
};

export {
  setStorage,
  getStorage,
  clearStorage,
  calculateTotalProductsPrice,
};
