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
      if (error) return { error: error.message };
    });
  return result;
};

export default login;
