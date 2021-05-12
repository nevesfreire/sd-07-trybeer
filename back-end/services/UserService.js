const jwt = require('jsonwebtoken');
const { jwtConfig, SECRET } = require('../config/jwt');
const { userModel } = require('../models');
const { validateUserData, validadeUserName } = require('./validations/UserValidations');
const { REGISTEREDEMAIL, SAMEUSERNAME } = require('./errors/UserMessage');

const registerUser = async (data) => {
  const { error } = validateUserData(data);
  if (error) throw error;
  const [userEmail] = await userModel.getUserEmail(data);
  if (userEmail[0]) throw REGISTEREDEMAIL;
  const newUser = await userModel.registerUser(data);
  const { name, email, role, password } = data;
  const token = jwt.sign({ email, password }, SECRET, jwtConfig);
  return { token, name, email, role, id: newUser[0].insertId };
};

const updateUser = async (name, email) => {
  const { error } = validadeUserName({ name });
  if (error) throw error;
  const [response] = await userModel.updateUser(name, email);
  if (response.changedRows === 0) throw SAMEUSERNAME;
  return { message: 'Atualização concluída com sucesso' };
};

module.exports = {
  registerUser,
  updateUser,
};