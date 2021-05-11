const userModel = require('../models/User');
const messageError = require('../helpers/message.json');
const errorCode = require('../helpers/status.json');

const updateUser = async (name, oldName) => {
  const user = await userModel.updateUser(name, oldName);
  return user;
};

module.exports = {
  updateUser,
};