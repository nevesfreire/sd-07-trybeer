const ClientModel = require('../Models/ClientModel');

const resLogin = async (email, password) => {
  const userOK = await ClientModel.getEmailUser(email, password);
  if (!userOK || userOK.email !== email) throw { message: 'unregistered user' };
  return ClientModel.token(userOK);
};

module.exports = {
  resLogin,
};