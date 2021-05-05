const User = require('../services/updateUserNameService');

const UPDATED = 200;

const updateUserName = async (req, res) => {
  const { name, email } = req.body;
  
  const result = await User.updateUserName(name, email);

  return res.status(UPDATED).json(result);
};

module.exports = {
  updateUserName,
};