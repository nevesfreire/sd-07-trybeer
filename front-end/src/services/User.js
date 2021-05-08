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

export default registerUser = (user) => {
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
