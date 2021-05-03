const jwt = require('jsonwebtoken');
const { loginModel } = require('../models');
const { validateLogin, validUser } = require('./LoginValidations');
require('dotenv').config();

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const getUser = async (data) => {
  const { error } = validateLogin(data);
  const dataUser = await loginModel.getUserInfo(data);
  if (error) throw error;
  await validUser(data);
  const { email, password } = dataUser;
  const token = jwt.sign({ email, password }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = {
  getUser,
};