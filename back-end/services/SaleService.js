const Sale = require('../models/SalesModel');
const User = require('../models/UserModel');
const CustomError = require('../helper/CustomError');
const { verifyToken } = require('../helper/AuthValidation');
const CODE = require('../helper/statusCodes');

const getUserId = async (token) => {
  if (!token) throw new CustomError(CODE.UNAUTHORIZED, 'Necessário realizar autenticação');

  // let userEmail;
  // try {
  //   const { username } = verifyToken(token);
  //   userEmail = username;
  // } catch (error) {
  //   throw new CustomError(error.status, error.message);
  // }
  // const { id } = await User.findByEmail(userEmail);
  // return id;

  const { payload, message } = verifyToken(token);
  if (message) throw new CustomError(CODE.UNAUTHORIZED, message);

  const { id } = await User.findByEmail(payload.username);
  return id;
};

const create = async (token, orderItems, orderDetails) => {
  try {
    const userId = await getUserId(token);
    const { total, deliveryAddress, deliveryNumber } = orderDetails;
    const saleId = await Sale.create(userId, total, deliveryAddress, deliveryNumber);

    orderItems.forEach(async (item) => {
      // try {
      await Sale.addSaleProducts(saleId, item.productId, item.quantity);
      // } catch (error) {
      // throw new CustomError(CODE.CONFLICT, error.message);
      // }
    });

    return { statusCode: CODE.CREATED, message: 'Compra realizada com sucesso!' };
  } catch (error) {
    console.log('service create error:', error);
    throw new CustomError(error.status, error.message);
  }
};

const findByUserId = async (token) => {
  try {
    const userId = await getUserId(token);
    const sales = await Sale.findByUserId(userId);
    return { statusCode: CODE.OK, sales };
  } catch (error) {
    throw new CustomError(CODE.INTERNAL_SERVER_ERROR, 'Erro ao conectar com o banco de dados');
  }
};

module.exports = {
  create,
  findByUserId,
};