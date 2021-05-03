const UserModel = require('../model/UserModel');

const create = async (name, email, role, password) => {
  const newUser = await UserModel.create(name, email, role, password);

  if (newUser.message) {
    return { message: 'email já cadastrado.', status: 500 };
  }

  return { newUser, status: 200 };
};

module.exports = { create };