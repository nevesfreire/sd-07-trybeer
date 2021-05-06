const model = require('../models');

const validateUserId = async (id) => {
  const user = await model.getById(id);
  if (!user) throw new Error('user not Exists');
  return user;
};

const validateCreateUser = async (name, email, password, role) => {
  if (!name || !email || !password || !role) throw new Error('fields not found');
  console.log(name, email, password, role, 'fields');

  const userExist = await model.getByEmail(email);
  if (userExist) throw new Error('Já existe um usuário com esse e-mail.');

  const result = await model.createUser(name, email, password, role);
  console.log(result, 'resultService')

  if (!result) throw new Error('Error to createUser');

  return { id: result.insertId, name, email, password, role };
}

module.exports = {
  validateUserId,
  validateCreateUser,
};
