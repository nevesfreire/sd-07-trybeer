const jwt = require('jsonwebtoken');
const {
  StatusCodes: { OK, UNAUTHORIZED },
} = require('http-status-codes');
const userModel = require('../models/userModel');
const {
  userPasswordMessage,
  updateNameMessageError,
  updateNameMessageSuccess,
} = require('../messages');

const customAnswer = (message, http = UNAUTHORIZED) => ({
  http,
  message,
});

const secret = process.env.SECRET_JWT || 'trybeer';

const jwtConfig = {
  expiresIn: 60 * 20,
  algorithm: 'HS256',
};

const loginUser = async (email, password) => {
  const userlogged = await userModel.loginUser(email);

  if (!userlogged) {
    return customAnswer(userPasswordMessage);
  }

  const passwordMatch = password === userlogged.password;

  if (!passwordMatch) {
    return customAnswer(userPasswordMessage);
  }
  const { name, role } = userlogged;
  const token = jwt.sign({ name, email, role }, secret, jwtConfig);
  return customAnswer({ token }, OK);
};

const profileNameUpdate = async (name, email) => {
  const userUpdated = await userModel.profileNameUpdate(name, email);
  if (!userUpdated) {
    return customAnswer(updateNameMessageError);
  }
  return customAnswer(updateNameMessageSuccess, OK);
};

const registerUser = async (name, email, password, role) => {
  let priveleges = 'administrator';
  if (!role) { priveleges = 'client'; }
  const token = jwt.sign({ name, email, role }, secret, jwtConfig);
  await userModel.registerUser(name, email, password, priveleges);
  return token;
};

module.exports = {
  loginUser,
  profileNameUpdate,
  registerUser,
};
