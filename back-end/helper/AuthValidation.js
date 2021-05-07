const jwt = require('jsonwebtoken');

const SECRET = 'secreto';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const generateToken = (dataUser) => {
  let admin = false;
  if (dataUser.role === 'administrator') admin = true;

  const payload = {
    username: dataUser.email,
    admin,
  };

  return jwt.sign(payload, SECRET, jwtConfig);
};

module.exports = {
  generateToken,
};
