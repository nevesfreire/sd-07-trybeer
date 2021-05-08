import axios from 'axios';

const login = async (email, password) => {
  const result = await axios.post('http://localhost:3001/login', {
    email,
    password,
  })
    .then((response) => {
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      if (error) return { error: 'Usuário ou senha inválido!' };
    });

  return result;
};

const userStorage = JSON.parse(localStorage.getItem('user'));
const { token } = userStorage === null ? '' : userStorage;

const config = {
  headers: {
    'Content-Type': 'application/json',
    authorization: token,
  },
};

const productList = async () => {
  const result = await axios.get('http://localhost:3001/products', config)
    .then((response) => response.data)
    .catch((error) => {
      if (error) return { error: 'Token inválido ou lista não encontrada!' };
    });
  return result;
};

export {
  login,
  productList,
  userStorage,
};
