const contentType = { 'Content-Type': 'application/json' };

const userLogin = ({ email, password }) => fetch('http://localhost:3001/login', {
  method: 'POST',
  headers: contentType,
  body: JSON.stringify({ email, password }),
})
  .then((response) => response.json())
  .catch((error) => console.log(error));

const registerUser = ({ name, email, password, role }) => fetch('http://localhost:3001/user', {
  method: 'POST',
  headers: contentType,
  body: JSON.stringify({ name, email, password, role }),
})
  .then((response) => response.json())
  .catch((error) => console.log(error));

const updateUser = ({ name, email }) => fetch('http://localhost:3001/user', {
  method: 'PUT',
  headers: contentType,
  body: JSON.stringify({ name, email }),
})
  .then((response) => response.json())
  .catch((error) => console.log(error));

const getProducts = (token) => fetch('http://localhost:3001/products', {
  method: 'GET',
  headers: { ...contentType, authorization: token },
})
  .then((response) => response.json())
  .catch((error) => console.log(error));

export {
  userLogin,
  registerUser,
  updateUser,
  getProducts,
};
