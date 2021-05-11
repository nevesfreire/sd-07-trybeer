const model = require('./model');
const { nameIsValid, passwordIsValid, emailIsValid } = require('../../helpers/validations');

const getAll = async () => (model.getAll());

const getByEmail = async (email) => (model.getByEmail(email));

const create = async (name, email, password, role) => {
  const bodyIsValid = nameIsValid(name) && passwordIsValid(password) && emailIsValid(email);
  if (!bodyIsValid) return { error: true, message: 'dados inválidos' };
  const userExists = await model.getByEmail(email);
  if (userExists) return { error: true, message: 'email já cadastrado' };
  await model.create(name, email, password, role);
  return { error: false, message: 'usuário cadastrado com sucesso' };
};

const update = async (name, email) => {
  const bodyIsValid = nameIsValid(name) && emailIsValid(email);
  if (!bodyIsValid) return { error: true, message: 'dados inválidos' };
  const userExists = await model.getByEmail(email);
  if (!userExists) return { error: true, message: 'usuário não encontrado' };
  await model.update(name, email);
  return { error: false, message: 'usuário alterado com sucesso' };
};

module.exports = { 
  getAll, 
  getByEmail,
  create,
  update,
};
