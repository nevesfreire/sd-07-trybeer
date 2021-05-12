const jwt = require('jsonwebtoken');
const { jwtConfig, SECRET } = require('../config/jwt');

const newToken = () => {
  const token = jwt.sign({ email: 'tryber@trybe.com.br', password: '123456' }, SECRET, jwtConfig);
  const data = { 
    token, 
    name: 'Tryber Admin', 
    email: 'tryber@trybe.com.br', 
    role: 'administrator', 
    id: 1 };
  return data;
};

module.exports = newToken;