const { StatusCodes } = require('http-status-codes');
const { loginServices } = require('../services');

// Login
const signIn = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await loginServices.signInLogin(data);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

// Cadastro
const signUp = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await loginServices.signUpLogin(data);
    console.log('result', result);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signIn,
  signUp,
};
