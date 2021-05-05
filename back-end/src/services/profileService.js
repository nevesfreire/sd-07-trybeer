const userModel = require('../models/usersModel');

const updateUserName = async (name, email) => {
  await userModel.updateName(name, email);
};

module.exports = { updateUserName };
