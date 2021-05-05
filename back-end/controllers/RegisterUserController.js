const User = require('../services/registerUserService');

const registerUser = async (req, res) => {
  const { name, email, password, wantToSell } = req.body;
  
  const result = await User.registerUser(name, email, password, wantToSell);

  return res.status(201).json(result);
};

module.exports = {
  registerUser,
};