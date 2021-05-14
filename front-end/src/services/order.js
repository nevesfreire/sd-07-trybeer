const REQUEST_OK = 200;
const UNAUTHORIZED = 401;
const contentType = { 'Content-type': 'application/json' };

export const saveOrder = (dispatch, finish, order) => {
  try {
    const url = 'http://localhost:3001/orders';
    return fetch(url, {
      method: 'POST',
      body: order,
      headers: {
        ...contentType,
      },
    })
      .then((response) => {
        if (response.status !== REQUEST_OK) {
          throw new Error();
        } else {
          return response.json()
            .then((json) => json)
            .then(() => dispatch(finish('success')));
        }
      });
  } catch (error) {
    dispatch(finish('fail'));
    console.log(error.message);
  }
};

export const getOrders = (email, token) => {
  try {
    const url = 'http://localhost:3001/orders';
    return fetch(url, {
      method: 'GET',
      body: email,
      headers: {
        ...contentType,
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status === UNAUTHORIZED) {
          throw new Error();
        } else {
          return response.json()
            .then((json) => json);
        }
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const getOrder = (id, token) => {
  try {
    const url = `http://localhost:3001/orders/${id}`;
    return fetch(url, {
      method: 'GET',
      body: email,
      headers: {
        ...contentType,
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status === UNAUTHORIZED) {
          throw new Error();
        } else {
          return response.json()
            .then((data) => data);
        }
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const getAdminOrders = () => {
  try {
    /* const url = 'http://localhost:3001/orders'; */
    return fetch(url, {
      method: 'GET',
      headers: {
        ...contentType,
      },
    })
      .then((response) => {
        if (response.status !== REQUEST_OK) {
          throw new Error();
        } else {
          return response.json()
            .then((json) => json);
        }
      });
  } catch (error) {
    console.log(error.message);
  }
};
