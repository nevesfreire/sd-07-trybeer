const { generateToken } = require('../../helper/AuthValidation');

const user = {
  email: 'teste@teste.com',
  password: 'teste123',
};

const admin = {
  email: 'teste@teste.com',
  password: 'teste123',
  role: 'administrator',
};


const token = {
  invalid: '1A2b3Cde78',
  user: generateToken(user),
  admin: generateToken(admin),
};

module.exports = token;