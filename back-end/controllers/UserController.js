const UserService = require('../services/UserService');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await UserService.registerUser(name, email, password, role);
    return res.status(result.status).json(result.message);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};

const updateUserName = async (req, res) => {
  try {
  const { newName, email } = req.body;
  const result = await UserService.updateUserName(newName, email);
  return res.status(result.status).json(result.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'server error' });
  }  
};

module.exports = {
  registerUser,
  updateUserName,
};
