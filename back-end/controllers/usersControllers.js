const { StatusCodes: { INTERNAL_SERVER_ERROR } } = require('http-status-codes');
const userServices = require('../services/usersService');

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

module.exports = {
  loginUser,
  profileNameUpdate,
};