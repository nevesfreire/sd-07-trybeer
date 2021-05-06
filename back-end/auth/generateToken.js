const jwt = require('jsonwebtoken');
require('dotenv').config();

const password = process.env.JWT_KEY || 'secret';

const create = (name, email, role) => {
  const userObj = {
    name,
    email,
    role,
  };

  const header = {
    algorithm: 'HS256',
    expiresIn: 60 * 60 * 4,
  };

  const token = jwt.sign(userObj, password, header);
  return token;
};

module.exports = { create };
