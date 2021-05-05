const User = require('../models/UserModel');
const CustomError = require('../helper/CustomError');
const { generateToken } = require('../helper/AuthValidation');
const CODE = require('../helper/statusCodes');

const findByEmailAndPassword = async (email, password) => {
  const user = await User.findByEmailAndPassword(email, password);
  if (!user) throw new CustomError(CODE.UNAUTHORIZED, 'Usuário inválido');

  user.token = generateToken(user);

  return { statusCode: CODE.OK, user };
};

module.exports = {
  findByEmailAndPassword,
};
