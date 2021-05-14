import { handleStorage } from '../../utils';
import fetchApi from './fetchAPI';

const StatusError = 300;
export default function fetchAPIfor(URI) {
  const { token } = handleStorage.get('user') || { token: '' };

  const body = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  return fetchApi(URI, body)
    .then((response) => response.json()).then((response) => {
      if (response.statusCode > StatusError) {
        throw new Error('A requisição deu errado');
      } else {
        return response;
      }
    });
}
