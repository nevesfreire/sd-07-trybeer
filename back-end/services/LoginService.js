const jwt = require('jsonwebtoken');
const { jwtConfig, SECRET } = require('../config/jwt');
const { loginModel } = require('../models');
const { validateLogin, validUser } = require('./validations/LoginValidations');
require('dotenv').config();

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