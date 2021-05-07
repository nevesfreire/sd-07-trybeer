const INITIAL_STATE = {
  cart: [],
  totalPrice: 0,
  checkouted: false,
};

const Types = {
  UPDATE_TOTAL_PRICE: 'client/updateTotalPrice',
  UPDATE_CART: 'client/updateCart',
  CHECKOUTED: 'client/checkout',
};

export const Creators = {
  // changeTotalPrice: (price) => ({
  //   type: Types.UPDATE_TOTAL_PRICE,
  //   price,
  // }),
  updateCart: (cart) => ({
    type: Types.UPDATE_CART,
    cart,
  }),
  checkout: () => ({
    type: Types.CHECKOUTED,
  }),
};

function clientReducer(state = INITIAL_STATE, action) {
  const { type, cart } = action;
  switch (type) {
  // case Types.UPDATE_TOTAL_PRICE:
  //   return {
  //     ...state,
  //     totalPrice: price,
  //   };
  case Types.UPDATE_CART:
    return {
      ...state,
      cart,
      totalPrice: cart.reduce((acc, { quantity, price }) => {
        if (!quantity) return acc;
        return acc + Math.round((Number(price) * 100) * quantity) / 100;
      }, 0),
    };
  case Types.CHECKOUTED:
    return {
      ...state,
      checkouted: !state.checkouted,
    };
  default:
    return state;
  }
}

export default clientReducer;
