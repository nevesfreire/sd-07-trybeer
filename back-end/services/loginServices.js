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
  console.log(user);
  if(!user) throw errors.invalidData;
  const token = tokenServices.generateToken(email);
  return token;
};

const signUpLogin = async (data) => {
  const { email, password, name, role } = data;
  validEmail(email);
  validPassword(password);
  validName(name);
  console.log(role);
  const userAlreadyExistis = await loginModel.getUserByEmail(email);
  if (userAlreadyExistis) return null;

  const result = await loginModel.createUser(data);
  return result;
};

module.exports = {
  signInLogin,
  signUpLogin,
};
