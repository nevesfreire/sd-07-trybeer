import { finish } from '../actions';

export const saveOrder = (dispatch, order) => {
  try {
    const url = 'http://localhost:3001/orders';
    return fetch(url, {
      method: 'POST',
      body: order,
      headers: { 'Content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((json) => json)
      .then(() => dispatch(finish('success')));
  } catch (error) {
    dispatch(finish('fail'));
    console.log(error.message);
  }
};
