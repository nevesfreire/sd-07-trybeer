const { registerUser } = require('../models/register');

const registerService = async (name, email, password, role) => {
  const register = await registerUser(name, email, password, role);

  return register;
};

module.exports = {
  registerService,
};