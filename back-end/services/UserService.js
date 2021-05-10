const User = require('../models/UserModel');
const CustomError = require('../helper/CustomError');
const { generateToken, verifyToken } = require('../helper/AuthValidation');
const Validations = require('./validations');
const CODE = require('../helper/statusCodes');

const create = async (name, email, password, role) => {
  const { error } = Validations.userValidation({ name, email, password, role });
  if (error) throw new CustomError(CODE.BAD_REQUEST, error.message);

  const user = await User.findByEmail(email);
  if (user) throw new CustomError(CODE.CONFLICT, 'Já existe um usuário com esse e-mail.');

  const userRole = (role) ? 'administrator' : 'client';

  try {
    await User.create(name, email, password, userRole);
    return { statusCode: CODE.CREATED, message: 'Usuário criado com sucesso!' };
  } catch (err) {
    throw new CustomError(CODE.INTERNAL_SERVER_ERROR, 'Erro ao conectar com o banco de dados');
  }
};

const findByEmailAndPassword = async (email, password) => {
  const user = await User.findByEmailAndPassword(email, password);
  if (!user) throw new CustomError(CODE.UNAUTHORIZED, 'Usuário inválido');

  user.token = generateToken(user);

  return { statusCode: CODE.OK, user };
};

const updateUser = async (token, name) => {
  if (!token) throw new CustomError(CODE.UNAUTHORIZED, 'Necessário realizar autenticação');
  const { username } = verifyToken(token);

  // Adicionar validação para o nome
  const update = await User.updateUser(name, username);
  if (update < 1) throw new CustomError(CODE.CONFLICT, 'Não foi possível atualizar o nome');
  return { statusCode: CODE.ACCEPTED, message: 'Atualização concluída com sucesso' };
};

module.exports = {
  create,
  findByEmailAndPassword,
  updateUser,
};
