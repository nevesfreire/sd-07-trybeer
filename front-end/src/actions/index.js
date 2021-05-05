// import * as API from '../services/api';

export function login(clientInfo) {
  return ({
    type: 'LOGIN',
    client: clientInfo,
  });
}

export function changeTotalPrice(price) {
  return ({
    type: 'CHANGE_TOTAL_PRICE',
    price
  });
}
