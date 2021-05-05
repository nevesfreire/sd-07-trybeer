import axios from 'axios';

const login = async (email, password) => {
  const result = await axios.post('http://localhost:3001/login', {
    email,
    password,
  })
    .then((response) => response.data)
    .catch((error) => console.log(error));
  localStorage.setItem('user', result);

  return result;
};

export default login;
