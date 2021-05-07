const setStorage = (key, value) => localStorage.setItem(
  key, JSON.stringify(value),
);

const getStorage = (key) => JSON.parse(localStorage.getItem(key));

const clearStorage = (key) => localStorage.removeItem(key);

function calculateTotalProductsPrice(cart) {
  // let updateTotalPrice = 0;
  // cart.forEach((product) => {
  //   let productQuantity = product.quantity;
  //   if (!productQuantity) productQuantity = 0;
  //   const totalPrice = Math
  //     .round((Number(product.price) * 100) * productQuantity) / 100;
  //   updateTotalPrice += totalPrice;
  // });
  // return updateTotalPrice;
  return cart.reduce((acc, { quantity, price }) => {
    if (!quantity) return acc;
    return Math.round((Number(price) * 100) * quantity) / 100;
  }, 0);
}

export {
  setStorage,
  getStorage,
  clearStorage,
  calculateTotalProductsPrice,
};
