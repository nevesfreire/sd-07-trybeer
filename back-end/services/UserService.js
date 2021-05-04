const { userModel } = require('../models');
const { validateUserData } = require('./UserValidations');

const emailCadastrado = { message: 'Já existe um usuário com esse e-mail.' };
const registerUser = async (data) => {
  const { error } = validateUserData(data);
  if (error) throw error;
  const [userEmail] = await userModel.getUserEmail(data);
  if (userEmail[0]) throw emailCadastrado;
  await userModel.registerUser(data);
  return { message: 'Usuario cadastrado com sucesso' };
};

const updateUser = async (data) => {
  userModel.updateUser(data);
};

module.exports = {
  registerUser,
  updateUser,
};