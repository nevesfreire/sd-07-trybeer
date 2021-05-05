// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  totalPrice: 0,
  logged: false,
};

function clientReducer(state = INITIAL_STATE, action) {
  const { client, type } = action;
  switch (type) {
  case 'LOGIN':
    return {
      logged: true,
    };
  default:
    return state;
  }
}

export default clientReducer;
