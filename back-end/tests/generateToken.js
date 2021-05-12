const jwt = require('jsonwebtoken');
const { jwtConfig, SECRET } = require('../config/jwt');

const newToken = (type) => {
  if (type === 'admin') {
  const token = jwt.sign({ email: 'tryber@trybe.com.br', password: '123456' }, SECRET, jwtConfig);
  const data = { 
    token, 
    name: 'Tryber Admin', 
    email: 'tryber@trybe.com.br', 
    role: 'administrator', 
    id: 1 };
  return data;
}
const token = jwt.sign({ email: 'user@test.com', password: 'test123' }, SECRET, jwtConfig);
const data = { 
  token, 
  name: 'testuser', 
  email: 'user@test.com', 
  role: 'client', 
  id: 2 };
return data;
};

module.exports = newToken;