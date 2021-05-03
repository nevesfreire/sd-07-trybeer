const { loginModel } = require('../models');

const getUser = async () => loginModel.getUser();

module.exports = {
  getUser,
};