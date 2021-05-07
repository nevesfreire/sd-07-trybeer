const INITIAL_STATE = {
  cart: [],
  totalPrice: 0,
};

const Types = {
  UPDATE_TOTAL_PRICE: 'client/updateTotalPrice',
  UPDATE_CART: 'client/updateCart',
};

export const Creators = {
  changeTotalPrice: (price) => ({
    type: Types.UPDATE_TOTAL_PRICE,
    price,
  }),
  updateCart: (cart) => ({
    type: Types.UPDATE_CART,
    cart,
  }),
};

function clientReducer(state = INITIAL_STATE, action) {
  const { type, price, cart } = action;
  switch (type) {
  case Types.UPDATE_TOTAL_PRICE:
    return {
      ...state,
      totalPrice: price,
    };
  case Types.UPDATE_CART:
    return {
      ...state,
      cart,
    };
  default:
    return state;
  }
}

export default clientReducer;
