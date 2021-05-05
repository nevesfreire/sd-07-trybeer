const UserService = require('../services/UserService');

const CREATED = 201;
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await UserService.registerUser(name, email, password, role);
    return res.status(CREATED).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'server error' });
  }
};

const OK = 200;

const updateUserName = async (req, res) => {
  const { name, email } = req.body;
  
  const result = await UserService.updateUserName(name, email);

  return res.status(OK).json(result);
};

module.exports = {
  registerUser,
  updateUserName,
};
