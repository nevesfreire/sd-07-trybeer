const { loginModel } = require('../models/login');

const loginService = async (email, password) => {
  const login = await loginModel(email, password);

  return login;
};

module.exports = {
  loginService,
};