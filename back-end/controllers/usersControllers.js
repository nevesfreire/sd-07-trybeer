const { StatusCodes: { INTERNAL_SERVER_ERROR, OK } } = require('http-status-codes');
const userServices = require('../services/usersService');
const { userRegisterSuccess } = require('../messages');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogged = await userServices.loginUser(email, password);
    const { http, message } = userLogged;
    return res.status(http).json(message);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

const profileNameUpdate = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userUpdated = await userServices.profileNameUpdate(name, email);
    const { http, message } = userUpdated;
    return res.status(http).json(message);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const tokenLogin = await userServices.registerUser(name, email, password, role);
    console.log(tokenLogin);
    return res.status(OK).json({ message: userRegisterSuccess, token: tokenLogin });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = {
  loginUser,
  profileNameUpdate,
  registerUser,
};