const Product = require('../models/ProductModel');
const CustomError = require('../helper/CustomError');
const { verifyToken } = require('../helper/AuthValidation');
const CODE = require('../helper/statusCodes');

const findAll = async (token) => {
  if (!token) throw new CustomError(CODE.UNAUTHORIZED, 'Necessário realizar autenticação');
  verifyToken(token);

  const products = await Product.findAll();
  return { statusCode: CODE.OK, products };
};

module.exports = {
  findAll,
};
