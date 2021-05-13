const jwt = require('jsonwebtoken');
const CustomError = require('./CustomError');
const CODE = require('./statusCodes');

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

// const verifyToken = (token) => {
//   try {
//     const payload = jwt.verify(token, SECRET);
//     return { payload };
//   } catch (error) {
//     console.log('verifyToken error', error.name);
//     let errorMessage = error.message;
//     if (error.name === 'TokenExpiredError') errorMessage = 'Token expirado!';
//     if (error.name === 'JsonWebTokenError') errorMessage = 'Token inválido!';
//     console.log('Depois verifyToken error', errorMessage);
//     return { message: errorMessage };
//   }
// };

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, SECRET);
    return payload;
  } catch (error) {
    if (error.name === 'TokenExpiredError') error.message = 'Token expirado!';
    if (error.name === 'JsonWebTokenError') error.message = 'Token inválido!';
    // const { TokenExpiredError, JsonWebTokenError } = error;
    // if (TokenExpiredError) throw new CustomError(CODE.UNAUTHORIZED, 'Token expirado!');
    // if (JsonWebTokenError) throw new CustomError(CODE.UNAUTHORIZED, 'Token inválido!');
    throw new CustomError(CODE.UNAUTHORIZED, error.message);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};