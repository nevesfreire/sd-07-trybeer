const UserService = require('../services/UserService');
const UserModel = require('../models/UserModel');

const serverError = 'server error';
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await UserService.registerUser(name, email, password, role);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: serverError });
  }
};

const updateUserName = async (req, res) => {
  try {
  const { newName, email } = req.body;
  const updatedUser = await UserModel.updateUserName(newName, email);
  return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: serverError });
  }  
};
const registerOrder = async (req, res) => {
  try {
  const { userId, total, address, addressNumber, saleDate, status } = req.body;
  const order = { userId, total, address, addressNumber, saleDate, status };
  const result = await UserService.registerOrder(order);
  return res.status(result.status).json(result.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'server error' });
  }  
};

module.exports = {
  registerUser,
  updateUserName,
  registerOrder,
};
