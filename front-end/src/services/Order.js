import { finish } from '../actions';

const saveOrder = (dispatch, order) => {
  try {
    const url = 'http://localhost:3001/...';
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
