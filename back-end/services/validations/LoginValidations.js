const Joi = require('joi');
const { INVALIDUSER } = require('../errors/LoginMessages');
const { loginModel } = require('../../models');

const validateLogin = (data) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(data);

const validUser = async (data) => {
  const [userData] = await loginModel.getUserInfo(data);
  if (!userData[0]) throw INVALIDUSER;
};

module.exports = {
  validateLogin,
  validUser,
};