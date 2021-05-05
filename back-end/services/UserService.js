const User = require('../models/UserModel');
const CustomError = require('../helper/CustomError');
const { generateToken } = require('../helper/AuthValidation');
const validate = require('./validations');
const CODE = require('../helper/statusCodes');


const findByEmailAndPassword = async (email, password) => {

  const { error } = validate.loginValidation({ email, password });
  if (error) {
    throw new CustomError(CODE.BAD_REQUEST, error.message);
  }

  const user = await User.findByEmailAndPassword(email, password);
  if (!user) throw new CustomError(CODE.UNAUTHORIZED, 'Usuário inválido');

  user.token = generateToken(user);

  return { statusCode: CODE.OK, user };
};

module.exports = {
  findByEmailAndPassword,
}

