const ClientModel = require('../Models/ClientModel');
const { error2 } = require('../error/index');

const resLogin = async (email, password) => {
  const userOK = await ClientModel.getEmailUser(email, password);
  if (!userOK || userOK.email !== email) throw error2;
  return ClientModel.token(userOK);
};

const nameEdi = async (name, email) => {
  const userOK = await ClientModel.getEmailUser(email);
  if (!userOK || userOK.email !== email) throw error2;
  return ClientModel.editName(name);
};

module.exports = {
  resLogin,
  nameEdi,
};