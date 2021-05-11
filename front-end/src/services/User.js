/* export const getUser = () => {
  try {
    const url = '';
    return fetch(url)
      .then((response) => response.json())
      .then((json) => json);
  } catch (error) {
    console.log(error.message);
  }
};
 */
<<<<<<< HEAD
  const registerUser = (user) => {
=======

export const registerUser = (user) => {
>>>>>>> 002bdfb60cf49a5ca8e12c3beb18e28e23dfa2fe
  try {
    const url = 'http://localhost:3001/register';
    return fetch(url, {
      method: 'POST',
      body: user,
      headers: { 'Content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((json) => json);
  } catch (error) {
    console.log(error.message);
  }
};

export default registerUser;
