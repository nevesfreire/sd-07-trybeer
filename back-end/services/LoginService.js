const jwt = require('jsonwebtoken');
const { jwtConfig, SECRET } = require('../config/jwt');
const { Users } = require('../models');
const { validateLogin, validUser } = require('./validations/LoginValidations');
require('dotenv').config();

const getUser = async (data) => {
  const { email, password } = data;
  const { error } = validateLogin(data);
  const [dataUser] = await Users.findOne({ where: { email, password }});
  if (error) throw error;
  await validUser(data);
  const { name, role, id } = dataUser[0];
  const token = jwt.sign({ email, password }, SECRET, jwtConfig);
  return { token, name, email, role, id };
};

module.exports = {
  getUser,
};