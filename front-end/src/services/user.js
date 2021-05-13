const UNAUTHORIZED = 401;

const registerUser = (user) => {
  try {
    const url = 'http://localhost:3001/register';
    return fetch(url, {
      method: 'POST',
      body: user,
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === UNAUTHORIZED) {
          throw new Error();
        } else {
          return response.json().then((json) => json);
        }
      });
  } catch (error) {
    console.log(error.message);
  }
};

export default registerUser;
