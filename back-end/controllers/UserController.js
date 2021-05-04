const { userService } = require('../services');

const createUser = async (req, res) => {
  try {
    const data = req.body;
    const userData = await userService.registerUser(data);
    res.status(201).json(userData);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const { email } = req.user[0];
    const response = await userService.updateUser(name, email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
};