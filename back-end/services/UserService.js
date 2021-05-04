const { userModel } = require('../models');
const { validateUserData, validadeUserName } = require('./UserValidations');

const emailCadastrado = { message: 'Já existe um usuário com esse e-mail.' };
const mesmoNomeDeUsuario = { message: 'Usuário não atualizado' };

const registerUser = async (data) => {
  const { error } = validateUserData(data);
  if (error) throw error;
  const [userEmail] = await userModel.getUserEmail(data);
  if (userEmail[0]) throw emailCadastrado;
  await userModel.registerUser(data);
  return { message: 'Usuario cadastrado com sucesso' };
};

const updateUser = async (name, email) => {
  const { error } = validadeUserName({ name });
  if (error) throw error;
  const [response] = await userModel.updateUser(name, email);
  if (response.changedRows === 0) throw mesmoNomeDeUsuario;
  return { message: 'Atualização concluida com sucesso' };
};

module.exports = {
  registerUser,
  updateUser,
};