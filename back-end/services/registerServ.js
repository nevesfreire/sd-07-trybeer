const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { created } = require('./dictionaries/statusMsgMap');

const registerServ = async (body) => {
  const { name, email, password, isSeller } = body;

  const salt = bcrypt.genSaltSync(5);
  const cryptedPassword = bcrypt.hashSync(password, salt);

  const role = isSeller ? 'administrator' : 'client';
  await userModel.create({ name, email, password: cryptedPassword, role });

  return created;
};

module.exports = registerServ;
