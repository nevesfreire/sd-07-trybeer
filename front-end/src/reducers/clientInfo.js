// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  name: '',
  email: '',
  type: '',
  totalPrice: 0,
  logged: false,
};

function clientReducer(state = INITIAL_STATE, action) {
  const { client, type } = action;
  switch (type) {
  case 'LOGIN':
    return {
      ...state,
      // name: client.name,
      email: client.email,
      // type: client.type,
      logged: true,
    };
  default:
    return state;
  }
}

export default clientReducer;
