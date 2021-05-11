import axios from 'axios';

const URL = 'http://localhost:3001';

const login = async (email, password) => {
  const result = await axios.post(`${URL}/login`, {
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

const register = async (name, email, password, role) => {
  const result = await axios.post(`${URL}/register`, {
    name,
    email,
    password,
    role,
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      if (error) return { error: 'Já existe um usuário com esse e-mail.' };
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

export {
  login,
  register,
  updateClient,
};
