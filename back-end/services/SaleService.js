const Sale = require('../models/SalesModel');
const User = require('../models/UserModel');
const CustomError = require('../helper/CustomError');
const { verifyToken } = require('../helper/AuthValidation');
const CODE = require('../helper/statusCodes');

const create = async (token, total, deliveryAddress, deliveryNumber) => {
  if (!token) throw new CustomError(CODE.UNAUTHORIZED, 'Necessário realizar autenticação');

  let userEmail;
  try {
    const { username } = verifyToken(token);
    userEmail = username;
  } catch (error) {
    throw new CustomError(error.status, error.message);
  }
  const { id } = await User.findByEmail(userEmail);

  try {
    await Sale.create(id, total, deliveryAddress, deliveryNumber);
    return { statusCode: CODE.CREATED, message: 'Compra realizada com sucesso!' };
  } catch (error) {
    throw new CustomError(CODE.INTERNAL_SERVER_ERROR, 'Erro ao conectar com o banco de dados');
  }
};

module.exports = {
  create,
};