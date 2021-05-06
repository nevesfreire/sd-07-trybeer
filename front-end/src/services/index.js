const METHOD_POST = 'POST';
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
      console.log('fez o fetch');
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
      console.log('fez o fetch do email', result);
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
      console.log('fez criação do novo usuário', newUser);
    });
  return newUser;
};

const pathRedirectByRole = (role) => {
  console.log('entrou no redirect');
  if (role === 'client') return '/products';
  if (role === 'administrator') return '/admin/orders';
};

export {
  loginFetch,
  pathRedirectByRole,
  newUserRegister,
  searchUserByEmail,
};
