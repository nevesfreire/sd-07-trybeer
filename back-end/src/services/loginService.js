const userModel = require("../models/usersModel");

const checkUserAndPass = async (email, password) => {
  const findByEmail = await userModel.findByEmail(email);
  if (!findByEmail) return false;
  if (findByEmail.password !== password) return false;
  return true;
};

module.exports = {
  checkUserAndPass,
};
