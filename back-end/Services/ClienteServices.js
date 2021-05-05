const ClientModel = require('../Models/ClientModel');

const resLogin = async (email, password) => {
  const userOK = await ClientModel.getEmailUser(email);
  if (!userOK || userOK.password !== password) throw { message: "unregistered user" };
  return ClientModel.token(userOK);
};

module.exports = {
  resLogin,
}