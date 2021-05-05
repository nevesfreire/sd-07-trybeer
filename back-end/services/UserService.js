const UserModel = require('../models/UserModel');

const registerUser = async (name, email, password, role) => {
  const user = await UserModel.getByEmail(email);
  if (user !== undefined) return { status: 401, message: 'Já existe um usuário com esse e-mail.' };
  await UserModel.registerUser(name, email, password, role);
  return { status: 200, message: 'Usuário cadastrado com sucesso' };
};

const updateUserName = async (newName, email) => {
 await UserModel.updateUserName(newName, email);
  return { status: 200, msg: 'Atualização concluída com sucesso' };
};

module.exports = {
  registerUser,
  updateUserName,
};
