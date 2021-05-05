const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const CustomError = require('../customErrors/CustomError');
const userModel = require('../models/userModel');

const { secret } = require('../auth/secret.json');

const validateUserInput = (name, email, password, role) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } })
      .required(),
    password: joi.string().required(),
    role: joi.string().required(),
  });
  const { error } = schema.validate({ name, email, password, role });
  if (error) {
    throw new CustomError('Invalid entries. Try again.', 400);
  }
};

const isEmailExist = async (email) => {
  const emailResult = await userModel.getByEmail(email);
  if (emailResult) {
    throw new CustomError('Email already registered', 409);
  }
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
  return ({ email, role, name, token });
};

const createUser = async (name, email, password, role) => {
  validateUserInput(name, email, password, role);
  await isEmailExist(email);
  const newUser = await userModel.createUser(name, email, password, role);
  const newUserLoged = await login(newUser.email, newUser.password);
  return ({ ...newUserLoged });
};

const validateNewName = async (name, id) => {
  const schema = joi.object({
    name: joi.string().required(),
  });
  const { error } = schema.validate({ name });
  if (error) {
    throw new CustomError('Invalid entries. Try again.', 400);
  }
  await userModel.editUser(name, id);
  return ('Editado com sucesso');
};

module.exports = { 
  createUser,
  login,
  validateNewName,
 };