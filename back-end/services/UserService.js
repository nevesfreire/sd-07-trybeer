const UserModel = require('../models/UserModel');

const registerUser = async (name, email, password, role) => {
  const user = await UserModel.getByEmail(email);
  if (user !== undefined) return { status: 401, message: 'Já existe um usuário com esse e-mail.' };
  const newUser = await UserModel.registerUser(name, email, password, role);
  return { status: 201, message: newUser };
};

const updateUserName = async (newName, email) => {
  const updatedUser = await UserModel.updateUserName(newName, email);
  return { status: 200, message: updatedUser };
};
const registerOrder = async (order) => {
  const registeredOrder = await UserModel.registerOrder(order);
  return { status: 200, message: registeredOrder };
};
const getAllOrders = async () => {
  const allOrders = await UserModel.getAllOrders();
  return { status: 200, message: allOrders };
};
const getOrderDetailsById = async (orderId) => {
  const ordersDetails = await UserModel.getOrderDetailsById(orderId);
  return { status: 200, message: ordersDetails };
};
module.exports = {
  registerUser,
  updateUserName,
  registerOrder,
  getAllOrders,
  getOrderDetailsById,
};
