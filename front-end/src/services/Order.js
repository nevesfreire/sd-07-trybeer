import { finish } from '../actions';

const saveOrder = (dispatch, order) => {
  try {
<<<<<<< HEAD
    const url = 'http://localhost:3001/...';
=======
    const url = 'http://localhost:3001/orders';
>>>>>>> 002bdfb60cf49a5ca8e12c3beb18e28e23dfa2fe
    return fetch(url, {
      method: 'POST',
      body: order,
      headers: { 'Content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((json) => json)
      .then(() => dispatch(finish('success')));
  } catch (error) {
    dispatch(finish('fail'))
    console.log(error.message);
  }
};

export default saveOrder;
