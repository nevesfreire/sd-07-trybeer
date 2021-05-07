const UserModel = require('../models/UserModel');

const registerUser = async (name, email, password, role) => {
  const user = await UserModel.getByEmail(email);
  if (user !== undefined) return { status: 401, message: 'Já existe um usuário com esse e-mail.' };
  await UserModel.registerUser(name, email, password, role);
  const newUser = await UserModel.getByEmail(email);
  return { status: 201, message: newUser };
};

const updateUserName = async (newName, email) => {
  const updatedUser = await UserModel.updateUserName(newName, email);
  return { status: 200, message: updatedUser };
};

const registerOrder = async (order) => {
  const saleDate = await UserModel.getDate();
  await UserModel.registerOrder({ ...order, saleDate });
  const { userId } = order;
  const newOrder = await UserModel.getOrderByUserId(userId);
  return { status: 201, message: newOrder };
};

module.exports = {
  registerUser,
  updateUserName,
  registerOrder,
};
