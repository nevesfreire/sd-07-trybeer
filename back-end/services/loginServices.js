const { loginModel } = require('../models');
const tokenServices = require('./tokenServices');

const {
  validEmail,
  validPassword,
  validName,
  errors,
} = require('../helpers');

const signInLogin = async (data) => {
  const { email, password } = data;
  validEmail(email);
  validPassword(password);
  const user = await loginModel.getUserByEmail(email);
  if (!user) throw errors.invalidData;
  delete user.password;
  const token = tokenServices.generateToken({ data: user });
  delete user.id;
  return { token, user };
};

const signUpLogin = async (data) => {
  const { email, password, name } = data;
  validEmail(email);
  validPassword(password);
  validName(name);
  const userAlreadyExistis = await loginModel.getUserByEmail(email);
  if (userAlreadyExistis) throw errors.userAlredyExists;
  const user = await loginModel.createUser(data);
  delete user.password;
  const token = tokenServices.generateToken({ data: user });
  return token;
};

const updateUser = async (data) => {
  const { name } = data;
  validName(name);
  const updatedUser = await loginModel.updateUser(data);
  return updatedUser;
};

module.exports = {
  signInLogin,
  signUpLogin,
  updateUser,
};
