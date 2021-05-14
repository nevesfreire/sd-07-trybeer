const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const CONTENT_TYPE = 'application/json';

const loginFetch = async (userLogin) => {
  const { email, password } = userLogin;
  let user;
  await fetch('http://localhost:3001/user/login', {
    method: METHOD_POST,
    headers: {
      'Content-type': CONTENT_TYPE,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((response) => response.json())
    .then((responseJSON) => {
      user = responseJSON;
    });
  return user;
};
const searchUserByEmail = async (userEmail) => {
  let result;
  await fetch('http://localhost:3001/user/search', {
    method: METHOD_POST,
    headers: {
      'Content-type': CONTENT_TYPE,
    },
    body: JSON.stringify({
      email: userEmail,
    }),
  }).then((response) => response.json())
    .then((responseJSON) => {
      result = responseJSON;
    });
  return result;
};

const newUserRegister = async (newUserData) => {
  const { email, password, name, role } = newUserData;
  let newUser;
  await fetch('http://localhost:3001/user/register', {
    method: METHOD_POST,
    headers: {
      'Content-type': CONTENT_TYPE,
    },
    body: JSON.stringify({
      name,
      email,
      password,
      role,
    }),
  }).then((response) => response.json())
    .then((responseJSON) => {
      newUser = responseJSON;
    });
  return newUser;
};

const updateNameFetch = async (name, email) => {
  let result;
  await fetch('http://localhost:3001/user/updateName', {
    method: METHOD_PUT,
    headers: {
      'Content-type': CONTENT_TYPE,
    },
    body: JSON.stringify({
      name,
      email,
    }),
  }).then((response) => response.json())
    .then((responseJSON) => {
      result = responseJSON;
    });
  return result;
};
const fetchProducts = async () => {
  let result;
  await fetch('http://localhost:3001/products')
    .then((response) => response.json())
    .then((responseJSON) => {
      result = responseJSON;
      console.log(result);
    });
  return result;
};

const pathRedirectByRole = (role) => {
  console.log('entrou no redirect');
  if (role === 'client') return '/products';
  if (role === 'administrator') return '/admin/orders';
};

const fetchFinishSale = async (userId, totalPrice, addressObject, arrayProducts) => {
  const { address, houseNumber } = addressObject;
  await fetch('http://localhost:3001/sales/createsale', {
    method: METHOD_POST,
    headers: {
      'Content-type': CONTENT_TYPE,
    },
    body: JSON.stringify({
      userId,
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: houseNumber,
      arrayProducts,
    }),
  }).then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
    });
};

const fetchUpdateStatus = async (saleId) => {
  await fetch('http://localhost:3001/sales/status/', {
    method: METHOD_PUT,
    headers: {
      'Content-type': CONTENT_TYPE,
    },
    body: JSON.stringify({
      saleId,
    }),
  }).then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
    });
};

export {
  loginFetch,
  pathRedirectByRole,
  newUserRegister,
  searchUserByEmail,
  updateNameFetch,
  fetchProducts,
  fetchFinishSale,
  fetchUpdateStatus,
};
