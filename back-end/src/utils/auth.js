const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const userToken = (user) => {
  const jwtConfig = {
    expiresIn: 60 * 60 * 10,
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
};

module.exports = {
  userToken,
};
