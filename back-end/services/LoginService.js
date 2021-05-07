const jwt = require('jsonwebtoken');
const { loginModel } = require('../models');
const { validateLogin, validUser } = require('./validations/LoginValidations');
require('dotenv').config();

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const SECRET = 'semideiaprasecret';

const getUser = async (data) => {
  const { error } = validateLogin(data);
  const [dataUser] = await loginModel.getUserInfo(data);
  if (error) throw error;
  await validUser(data);
  const { email, password, name, role, id } = dataUser[0];
  const token = jwt.sign({ email, password }, SECRET, jwtConfig);
  return { token, name, email, role, id };
};

module.exports = {
  getUser,
};