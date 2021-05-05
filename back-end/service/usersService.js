const jwt = require('jsonwebtoken');
require('dotenv').config();
const usersModel = require('../model/usersModel');

const generateToken = (objectUser) => {
  const configJWT = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: objectUser }, process.env.SECRET, configJWT);
  return token;
};

const findByEmail = async (email) => {
  const user = await usersModel.findByEmail(email);
  return user;
};

const createUserService = async (name, email, password, role) => {
  await usersModel.createUser(name, email, password, role);
  return {
    message: 'Criando sucesso!',
  };
};

module.exports = {
  findByEmail,
  generateToken,
  createUserService,
};
