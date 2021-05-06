const INITIAL_STATE = {
  totalPrice: 0,
};

const Types = {
  UPDATE_TOTAL_PRICE: 'client/updateTotalPrice',
};

export const Creators = {
  changeTotalPrice: (price) => ({
    type: Types.UPDATE_TOTAL_PRICE,
    price,
  }),
};

function clientReducer(state = INITIAL_STATE, action) {
  const { type, price } = action;
  switch (type) {
  case Types.UPDATE_TOTAL_PRICE:
    return {
      ...state,
      totalPrice: price,
    };
  default:
    return state;
  }
}

export default clientReducer;
