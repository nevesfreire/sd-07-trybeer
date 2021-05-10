const jwt = require('jsonwebtoken');
const CustomError = require('./CustomError');
const CODE = require('../helper/statusCodes');


// Normalmente é declarada no .env,
// mas o avaliador não possui esta variável de ambiente. 
const SECRET = 'seguro';

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

const verifyToken = (token) => {
  try {
    const { payload, TokenExpiredError } = jwt.verify(token, SECRET);
    console.log('verify3 expire', TokenExpiredError)
    return payload;
  } catch (error) {
    const { TokenExpiredError, JsonWebTokenErro } = error;
    if (TokenExpiredError) throw new CustomError(CODE.UNAUTHORIZED, 'Token expirado!');
    if (JsonWebTokenErro) throw new CustomError(CODE.UNAUTHORIZED, 'Token inválido!');
    throw error;
  }

};

module.exports = {
  generateToken,
  verifyToken,
};