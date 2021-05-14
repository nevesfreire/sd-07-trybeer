import axios from 'axios';

const URL = 'http://localhost:3001';

const userStorage = JSON.parse(localStorage.getItem('user'));
const { token } = userStorage === null ? '' : userStorage;

const config = {
  headers: {
    'Content-Type': 'application/json',
    authorization: token,
  },
};

const login = async (email, password) => {
  const result = await axios.post(`${URL}/login`, {
    email,
    password,
  })
    .then((response) => response.data)
    .catch((error) => {
      if (error) return { error: 'Usuário ou senha inválido!' };
    });

  return result;
};

const productList = async () => {
  const result = await axios.get('http://localhost:3001/products', config)
    .then((response) => response.data)
    .catch((error) => {
      if (error) return { error: 'Token inválido ou lista não encontrada!' };
    });
  return result;
};

const register = async (name, email, password, role) => {
  const result = await axios.post(`${URL}/register`, {
    name,
    email,
    password,
    role,
  })
    .then((response) => response.data)
    .catch((error) => {
      if (error) return { error: 'Já existe um usuário com esse e-mail.' };
    });
  return result;
};

const saleById = async (id) => {
  const result = await axios.get(`${URL}/admin/orders/${ id }`)
    .then((response) => response.data)
    .catch((error) => {
      if (error) return { error: 'Pedido não encontrado' };
    });
  return result;
};

const updateClient = async (name, email) => {
  const result = await axios.put(`${URL}/profile`, {
    name,
    email,
  })
    .then((response) => response.data)
    .catch((error) => {
      if (error) return { error: error.message };
    });
  return result;
};

const saveSale = async (sale, products) => {
  const result = await axios.post(`${URL}/sales`,
    { sale, products },
    { headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
    }).then(() => console.log('Pedido Finalizado'))
    .catch((error) => {
      if (error) return { error: error.message };
    });
  return result;
};

export {
  login,
  productList,
  register,
  updateClient,
  saveSale,
};
