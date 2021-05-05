const User = require('../models/UserModel');

const registerUser = async (name, email, password, wantToSell) => {
  let role = 'client';

  if (wantToSell) role = 'admin';

  const { insertedId } = await User.registerUser(name, email, password, role);

  return {
    user: {
      name,
      email,
      role,
      _id: insertedId,
    },
  };
};

module.exports = {
  registerUser,
};