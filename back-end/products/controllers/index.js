const { StatusCodes } = require('http-status-codes');
const model = require('../models');
const service = require('../services');

const getAllProducts = async (req, res, next) => {
  try {
    const users = await model.getAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.error(error);
    next({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    });
  }
};

const createSalesProducts = async (req, res, next) => {
  try {
    const { userId } = req;
    const { totalProducts, street, houseNumber, shopCart } = req.body;
    const order = await service.validateFieldsSale(
      userId,
      totalProducts,
      street,
      houseNumber,
      'pendente',
      shopCart,
    );
    res.status(StatusCodes.CREATED).json(order);
  } catch (error) {
    console.error(error);
    next({
      status: StatusCodes.BAD_REQUEST,
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  createSalesProducts,
};
