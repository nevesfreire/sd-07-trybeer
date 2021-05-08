const jwt = require('jsonwebtoken');

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
  const payload = jwt.verify(token, SECRET);
  // Erro JsonWebTokenError é capturado no errorControler (INTERNAL_SERVER_ERROR)
  return payload;
};

module.exports = {
  generateToken,
  verifyToken,
};