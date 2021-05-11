import { handleStorage } from '../../utils';
import fetchApi from './fetchAPI';

export default function fetchMapImages() {
  const { token } = handleStorage.get('user');

  const body = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };

  return fetchApi('/images/Heineken%20600ml.jpg', body, token).then((products) => products.json());
}
