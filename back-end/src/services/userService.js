const jwt = require('jsonwebtoken');
const CustomError = require('../customErrors/invalidEntries');
const userModel = require('../models/userModel');
const { secret } = require('../auth/secret.json');

const create = async () => {
  
};

const login = async (emailInput, passwordInput) => {
  if (!emailInput || !passwordInput) {
    throw new CustomError('All fields must be filled', 401);
  }

  const user = await userModel.getByEmail(emailInput);
  if (!user || user.password !== passwordInput) {
    throw new CustomError('Incorrect username or password', 401);
  } 

  const { id, email, role, name } = user;
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const token = jwt.sign({ id, email, role }, secret, jwtConfig);
  return ({
    email, 
    role,
    name,
    token,
  });
};

module.exports = { 
  create,
  login,
 };