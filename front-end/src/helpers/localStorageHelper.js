export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));

export const getUser = () => JSON.parse(localStorage.getItem('user'));

export const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let flag = true;

  if (cart.length > 0) {
    cart.forEach((element, index) => {
      if (element.id === product.id) {
        element.quantidade += 1;
        flag = false;
      } else if (index === cart.length - 1 && flag) {
        cart.push(product);
      }
    });
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (product) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const filteredCart = cart.filter((element2) => element2.id !== product.id);

  cart.forEach((element) => {
    if (element.id === product.id) {
      if (element.quantidade === 1) {
        localStorage.setItem('cart', JSON.stringify(filteredCart));
      } else {
        element.quantidade -= 1;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  });
};

export const excludeProductFromCheckout = (id) => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const filteredCart = cart.filter((element) => element.id !== id);

  localStorage.setItem('cart', JSON.stringify(filteredCart));

  return filteredCart;
};
