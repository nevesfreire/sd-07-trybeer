const { generateToken } = require('../../helper/AuthValidation');

const user = {
  email: 'user@email.com',
  password: 'user123',
};

const admin = {
  email: 'admin@teste.com',
  password: 'admin123',
  role: 'administrator',
};

const token = {
  invalid: '1A2b3Cde78',
  user: generateToken(user),
  admin: generateToken(admin),
};

module.exports = token;