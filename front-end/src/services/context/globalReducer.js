const actionType = {
  REQUEST_PRODUCTS: 'REQUEST_PRODUCTS',
  REQUEST_ORDERS: 'REQUEST_ORDERS',
  REQUEST_SALES: 'REQUEST_SALES',
  USER_INVALID: 'USER_INVALID',
  USER_VALID: 'USER_VALID',
};

function globalReducer(state, action) {
  switch (action.type) {
  case actionType.REQUEST_PRODUCTS:
    return { ...state, products: action.payload };
  case actionType.REQUEST_ORDERS:
    return { ...state, orders: action.payload };
  case actionType.REQUEST_SALES:
    return { ...state, sales: action.payload };
  case actionType.USER_INVALID:
    return { ...state, isUserValid: false };
  case actionType.USER_VALID:
    return { ...state, isUserValid: true };
  default:
    return state;
  }
}

export { actionType, globalReducer };
