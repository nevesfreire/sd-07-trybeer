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

module.exports = {
  createUser,
};