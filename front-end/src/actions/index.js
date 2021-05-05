// import * as API from '../services/api';

export function login(clientInfo) {
  return ({
    type: 'LOGIN',
    client: clientInfo,
  });
}
