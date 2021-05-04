const User = require('../services/registerUserService');

const registerUser = async (req, res) => {
  const { email, password, name, wantToSell } = req.body;

  const result = await User.registerUser(email, password, name,wantToSell);

  if (result.message) return res.status(400).json(message);  

  return res.status(201).json(result);

};

module.exports = {
  registerUser
};