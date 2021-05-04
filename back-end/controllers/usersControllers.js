const { StatusCodes: { INTERNAL_SERVER_ERROR } } = require('http-status-codes');
const userServices = require('../services/usersService');

const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const userLogged = await userServices.loginUser(email, password);
    const { http, message } = userLogged;
    return res.status(http).json(message);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = {
  loginUser,
};