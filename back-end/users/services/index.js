const model = require('../models');
const { throwError } = require('../../helpers');

const validateUserId = async (id) => {
  const user = await model.getById(id);
  if (!user) throw new Error('user not Exists');
  return user;
};

const validateCreateUser = async (name, email, password, role) => {
  const userExist = await model.getByEmail(email);
  // if (userExist) throw new Error('Já existe um usuário com esse e-mail.');
  throwError(userExist, 'Já existe um usuário com esse e-mail.');

  const result = await model.createUser(name, email, password, role);

  throwError(!result, 'Error to createUser');
  // if (!result) throw new Error('Error to createUser');

  return { id: result.insertId, name, email, password, role };
};

module.exports = {
  validateUserId,
  validateCreateUser,
};
