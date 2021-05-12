const saveToken = (token) => localStorage.setItem(
  'token', JSON.stringify(token),
);

const saveProduct = (product) => localStorage.setItem(
  'product', JSON.stringify(product),
);

const getToken = () => JSON.parse(localStorage.getItem('token'));

const getProduct = () => JSON.parse(localStorage.getItem('product'));

const loadItemsToLocalStorage = (id, price, qtd, name , url_image) => {
  if (Storage) {
    const getItemSaved = JSON.parse(localStorage.getItem('cart'));
    const values = (getItemSaved === null ? [] : getItemSaved);
    let newItemSaved = [];
    if(getItemSaved) {newItemSaved = getItemSaved.filter(cart => cart[0] !== id)}
    newItemSaved.push([ id, price, qtd, name, url_image ]);
    localStorage.setItem('cart', JSON.stringify(newItemSaved));
}};

export {
  getToken,
  saveToken,
  saveProduct,
  getProduct,
  loadItemsToLocalStorage,
};
