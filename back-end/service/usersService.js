const usersModel = require('../model/usersModel');

const findByEmail = async (email) => {
  const user = await usersModel.findByEmail(email);
  console.log('user', user);
};

module.exports = {
  findByEmail,
};
