const UserModel = require('../models/UserModel');

const registerUser = async (name, email, password, role) => {
  const user = await UserModel.getByEmail(email);
  if (user !== undefined) return { status: 401, message: 'Já existe um usuário com esse e-mail.' };
  const newUser = await UserModel.registerUser(name, email, password, role);
  return { status: 201, message: newUser };
};

const updateUserName = async (newName, email) => {
  await UserModel.updateUserName(newName, email);
  return { status: 200, message: 'Atualização concluída com sucesso' };
};

const registerOrder = async (order) => {
  const saleDate = await UserModel.getDate();
  const { userEmail, totalCart, address, addressNumber, status } = order;
  const user = await UserModel.getByEmail(userEmail);
  const { id } = user;
  await UserModel.registerOrder({
    userId: id,
    totalCart,
    address, 
    addressNumber,
    saleDate,
    status });
  return { status: 201, message: 'Compra realizada com sucesso!' };
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
