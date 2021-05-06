const userModel = require('../models/userModels');
const { created, emailInDatabase } = require('./dictionaries/statusMsgMap');

const registerServ = async (body) => {
  const { name, email, password, isSeller } = body;

  const alreadyExists = await userModel.getUserByEmail(email);
  if (alreadyExists) return emailInDatabase;

  const role = isSeller ? 'administrator' : 'client';
  await userModel.create({ name, email, password, role });

  return created;
};

module.exports = registerServ;
