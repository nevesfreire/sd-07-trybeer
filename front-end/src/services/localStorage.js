// source: https://pt.stackoverflow.com/questions/6526/como-formatar-data-no-javascript
function formatedDate() {
  const ONE = 1;
  const date = new Date(),
    day = date.getDate().toString(),
    dayF = day.length === ONE ? "0" + day : day,
    month = (date.getMonth() + ONE).toString(), //+1 pois no getMonth Janeiro começa com zero.
    monthF = month.length === ONE ? "0" + month : month,
    year = date.getFullYear();
  return dayF + "/" + monthF + "/" + year;
}

const setStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const setPurchaseStorage = (value) => {
  if (!getStorage("purchase")) {
    localStorage.setItem("purchase", JSON.stringify([]));
  }
  const purchase = getStorage("purchase");
  let total = value.reduce(function (acc, act) {
    return acc + act.quantity * act.price;
  }, 0);

  const newObject = {
    id: purchase.length + 1,
    sale_date: formatedDate(),
    products: value,
    total_price: total,
  };
  
  purchase.push(newObject);
  localStorage.setItem("purchase", JSON.stringify(purchase));
};
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
  return cart.reduce((acc, {quantity, price}) => {
    if (!quantity) return acc;
    return Math.round(Number(price) * 100 * quantity) / 100;
  }, 0);
}

export {
  setStorage,
  getStorage,
  clearStorage,
  calculateTotalProductsPrice,
  setPurchaseStorage,
};
