const UserModel = require('../models/UserModel');

const registerUser = async (name, email, password, role) => {
  const { insertedId } = await UserModel.registerUser(name, email, password, role);

  return {
    user: {
      name,
      email,
      role,
      _id: insertedId,
    },
  };
};

const updateUserName = async (name, email) => {
 await UserModel.updateUserName(name, email);

  return {
    user: {
      name,
      email,
    },
  };
};

module.exports = {
  registerUser,
  updateUserName,
};
