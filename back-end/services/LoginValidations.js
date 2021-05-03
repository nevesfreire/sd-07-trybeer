const Joi = require('joi');
const { loginModel } = require('../models');

const validateLogin = (data) =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(data);

module.exports = {
  validateLogin,
};