import axios from 'axios';
import { saveProduct } from '../helpers/localStorage';

export default async function fetchProducts() {
  const requestProductsUrl = 'http://localhost:3001/products';

  const requestHeader = {
    'Content-Type': 'application/json',
  };

  try {
    const res = await axios.get(requestProductsUrl, requestHeader);
    console.log('res', res);
    const { data } = res;
    if (data) {
      saveProduct(data);
      return data;
    }
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
