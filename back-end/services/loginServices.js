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
  if(!user) throw errors.invalidData;
  delete user.password;
  const token = tokenServices.generateToken({data: user});
  return {token: token};
};

const signUpLogin = async (data) => {
  const { email, password, name, role } = data;
  validEmail(email);
  validPassword(password);
  validName(name);
  const userAlreadyExistis = await loginModel.getUserByEmail(email);
  if (userAlreadyExistis) throw errors.userAlredyExists;

  const result = await loginModel.createUser(data);
  return result;
};

module.exports = {
  signInLogin,
  signUpLogin,
};
