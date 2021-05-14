// const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = 'TRYBEER';

const checkToken = async (token) => {
  try {
    if (!token) return false;
  
    const decoded = jwt.verify(token, secret);
    const user = decoded;
    // acredito que o verify já verifica se o token ainda está valido (tempo)
    if (!user) return false;
    return user;
  } catch (error) {
    return console.log(error.message);
  }
};

module.exports = {
  checkToken,
};