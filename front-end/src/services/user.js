const { instance } = require('./apiInstance');

const registerUser = async (name, email, role, password) => {
  const result = await instance.post('user', { name, email, role, password });
  return result;
};

const loginUser = async (email, password) => {
  const result = await instance.post('login', { email, password });
  return result.data;
};

module.exports = {
  registerUser,
  loginUser,
};
