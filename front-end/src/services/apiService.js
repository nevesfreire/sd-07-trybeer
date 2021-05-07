const userLogin = ({ email, password }) => fetch('http://localhost:3001/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then((response) => response.json())
  .catch((error) => console.log(error));

export default userLogin;
