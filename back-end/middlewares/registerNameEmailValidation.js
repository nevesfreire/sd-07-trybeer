const { StatusCodes: { UNAUTHORIZED } } = require('http-status-codes');
const { userEmailorName } = require('../messages');
const { loginUser } = require('../models/userModel');

const registerNameEmailValidation = async (req, res, next) => {
  const minEmailLenght = 12;
  const { email, name } = req.body;
  const isEmailInUse = await loginUser(email);
  
  if (!name.lengh >= minEmailLenght || isEmailInUse) {
    return res.status(UNAUTHORIZED).json(userEmailorName);
  }
  next();
};

module.exports = {
  registerNameEmailValidation,
};