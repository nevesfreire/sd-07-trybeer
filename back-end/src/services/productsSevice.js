const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const checkToken = async (token) => {
  if (!token) return false;

  const decoded = jwt.verify(token, secret);
  const user = decoded;
  // acredito que o verify já verifica se o token ainda está valido (tempo)
  if (!user) return false;
  return user;
};

module.exports = {
  checkToken,
};