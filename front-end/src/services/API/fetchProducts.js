import { handleStorage } from '../../utils';
import fetchApi from './fetchAPI';

const StatusError = 401;
export default function fetchProducts() {
  const { token } = handleStorage.get('user') || { token: '' };

  const body = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  return fetchApi('/products', body)
    .then((products) => products.json()).then((response) => {
      if (response.statusCode === StatusError) {
        throw new Error('A requisição deu errado');
      } else {
        return response;
      }
    });
}
