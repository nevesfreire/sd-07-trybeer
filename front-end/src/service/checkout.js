import axios from 'axios';

export default async function fetchUser(
  userId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  cart,
) {
  const requestUserUrl = 'http://localhost:3001/checkout';

  const requestHeader = {
    'Content-Type': 'application/json',
  };

  const requestBody = {
    userId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    cart,
  };

  try {
    const res = await axios.post(requestUserUrl, requestBody, requestHeader);
    console.log('res', res);
    const { message } = res;
    if (message) {
      return message;
    }
  } catch (error) {
    console.error(error);
    return error.message;
  }
}
