export const getCartItems = () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart && cart.length > 0){
    return cart;
  }
  return [];
}
export const updateCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
}
export const addCartItem = (product) => {
  product.quantity = 1;
  const cart = getCartItems();
  const productAlreadyExists = cart.filter((cartproduct) => cartproduct.id === product.id);
  if( !cart || cart.length < 1) {
    cart.push(product);
  } else if (!productAlreadyExists) {
    cart.push(product);
  } else {
    cart.forEach((cartproduct) => {
      if (cartproduct.id === product.id) {
        cartproduct.quantity += 1;
      }
    });
  }
  updateCart(cart);
};
export const removeCartItem = (product) => {
  const cart = getCartItems();
  cart.forEach((cartproduct) => {
    if (cartproduct.id === product.id) {
      cartproduct.quantity -= 1;
    }
  });
  updateCart(cart);
};
export const getCartTotalPrice = () => {
  const cart = getCartItems();
  let cartValue = 0;
  if (cart && cart.length > 0) {
    cart.forEach((cartproduct) => {
      cartValue = cartValue + (cartproduct.quantity * cartproduct.price);
    } );
  }
  return cartValue.toFixed(2);
}
export const setCart = () => {
  let cart = localStorage.getItem('cart');
  if (cart === null) {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};
export const getCartQuantity = (id) => {
  const cart = getCartItems();
  let quantity = 0;
  cart.forEach((cartItem) => {
    if (cartItem.id === id) {
      quantity = cartItem.quantity;
    }
  })
  return quantity;
}
export const deleteFromCart = (id) => {
  const cart = getCartItems();
  const output = cart.filter((element) => element.id !== id);
  updateCart(output);
}