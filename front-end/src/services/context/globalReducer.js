const actionType = {
  REQUEST_PRODUCTS: 'REQUEST_PRODUCTS',
  OTHER: 'OTHER',
};

function globalReducer(state, action) {
  switch (action.type) {
  case actionType.REQUEST_PRODUCTS:
    return { ...state, products: action.payload };
  case actionType.OTHER:
    return state;
  default:
    return state;
  }
}

export { actionType, globalReducer };
