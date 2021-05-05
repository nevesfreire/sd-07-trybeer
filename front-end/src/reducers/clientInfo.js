// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  totalPrice: 0,
  logged: false,
};

function clientReducer(state = INITIAL_STATE, action) {
  const { type, price } = action;
  switch (type) {
  case 'LOGIN':
    return {
      ...state,
      logged: true,
    };
  case 'CHANGE_TOTAL_PRICE':
    return {
      ...state,
      totalPrice: price,
    };
  default:
    return state;
  }
}

export default clientReducer;
