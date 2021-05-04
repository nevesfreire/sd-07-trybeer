const { StatusCodes: { OK, UNAUTHORIZED } } = require('http-status-codes');
const { userPasswordMessage } = require('../messages');


const loginValidationMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email) || password.lengh < 6) {
    return res.status(UNAUTHORIZED).json(userPasswordMessage)
  }
  next();
}

module.exports = {
  loginValidationMiddleware
}