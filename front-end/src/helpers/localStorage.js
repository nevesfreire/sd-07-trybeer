const saveToken = (token) => localStorage.setItem(
  'token', JSON.stringify(token),
);

const saveProduct = (product) => localStorage.setItem(
  'product', JSON.stringify(product),
);

const getToken = () => JSON.parse(localStorage.getItem('token'));

const getProduct = () => JSON.parse(localStorage.getItem('product'));

export {
  getToken,
  saveToken,
  saveProduct,
  getProduct,
};
