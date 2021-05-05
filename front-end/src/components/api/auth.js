import api from './config';

export default function auth() {
  const userLogin = async (user) => {
    try {
      const response = await api.post('/login', user);
      return response.data;
    } catch ({ message }) {
      console.log(message);
    }
  };

  // const userRegister = async () => {

  // };

  return {
    userLogin,
  };
}
