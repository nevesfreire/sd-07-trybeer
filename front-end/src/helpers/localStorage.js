const saveToken = (token) => localStorage.setItem(
  'token', JSON.stringify(token),
);

const saveProduct = (product) => localStorage.setItem(
  'product', JSON.stringify(product),
);

const getToken = () => JSON.parse(localStorage.getItem('token'));

const getProduct = () => JSON.parse(localStorage.getItem('product'));

const loadItemsToLocalStorage = ({ id, price, qtd, name, urlImage }) => {
  if (Storage) {
    const getItemSaved = JSON.parse(localStorage.getItem('cart'));
    let newItemSaved = [];
    if (getItemSaved) { newItemSaved = getItemSaved.filter((cart) => cart[0] !== id); }
    newItemSaved.push([id, price, qtd, name, urlImage]);
    localStorage.setItem('cart', JSON.stringify(newItemSaved));
  }
};

const saveAllOrders = (allOrders) => localStorage.setItem(
  'allOrders', JSON.stringify(allOrders),
);

const getAllOrders = () => JSON.parse(localStorage.getItem('allOrders'));

const saveOrderById = (orderById) => localStorage.setItem(
  'orderById', JSON.stringify(orderById),
);

const getOrderById = () => JSON.parse(localStorage.getItem('orderById'));

const saveOrderDetails = (orderDetails) => localStorage.setItem(
  'orderDetails', JSON.stringify(orderDetails),
);

const getOrderDetails = () => JSON.parse(localStorage.getItem('orderDetails'));

export {
  getToken,
  saveToken,
  saveProduct,
  getProduct,
  loadItemsToLocalStorage,
  saveAllOrders,
  getAllOrders,
  saveOrderById,
  getOrderById,
  saveOrderDetails,
  getOrderDetails,
};
