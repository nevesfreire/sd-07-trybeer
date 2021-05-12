import { handleStorage } from '../../utils';
import fetchApi from './fetchAPI';

export default function fetchProducts() {
  const { token } = handleStorage.get('user');

  const body = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  return fetchApi('/products', body).then((products) => products.json());
}
