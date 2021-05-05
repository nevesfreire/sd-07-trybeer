const User = require('../models/UserModel');

const updateUserName = async (name, email) => {
 await User.updateUserName(name, email);

  return {
    user: {
      name,
      email,
    },
  };
};

module.exports = {
  updateUserName,
};