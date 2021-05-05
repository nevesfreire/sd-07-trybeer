const User = require('../models/UserModel');
const CustomError = require('../helper/CustomError');
const { generateToken } = require('../helper/AuthValidation');
const Validations = require('./validations');
const CODE = require('../helper/statusCodes');

const create = async (name, email, password, role) => {
  const { error } = Validations.userValidation({ name, email, password, role });
  if (error) throw new CustomError(CODE.BAD_REQUEST, error.message);

  const user = await User.findByEmail(email);
  if (user) throw new CustomError(CODE.CONFLICT, 'Email já cadastrado');

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

module.exports = {
  create,
  findByEmailAndPassword,
};
