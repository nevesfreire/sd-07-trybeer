const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const userToken = (user) => {
  const { name, email, role } = user[0];
  const jwtConfig = {
    expiresIn: 60 * 5 * 10,
    algorithm: 'HS256',
  };

  const token = jwt.sign({ name, email, role }, secret, jwtConfig);
  return token;
};

module.exports = {
  userToken,
};
