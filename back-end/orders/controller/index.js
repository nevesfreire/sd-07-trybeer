const { StatusCodes } = require('http-status-codes');
const model = require('../models');

const getAllOrders = async (_req, res, next) => {
  try {
    const users = await model.getAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    });
  }
};

const getAllSalesProducts = async (_req, res, next) => {
  try {
    const users = await model.getAllSalesProducts();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    });
  }
};

const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await model.getOrder(id);
    res.status(StatusCodes.OK).json(order);
  } catch (error) {
    next({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    });
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await model.updateStatus(id);
    res.status(StatusCodes.OK).json(order);
  } catch (error) {
    next({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    });
  }
};

module.exports = {
  getAllOrders,
  getAllSalesProducts,
  getOrder,
  updateStatus
};
