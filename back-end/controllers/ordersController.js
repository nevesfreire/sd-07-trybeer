const { StatusCodes } = require('http-status-codes');
const { ordersServices } = require('../services');

// Orders
const readSales = async (req, res, next) => {
  try {
    const result = await ordersServices.getSalesList();
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

// Pedidos por Id.
const readSalesById = async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const result = await ordersServices.getSalesById(id);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

// Pedidos por usuário.
const readSalesByUser = async (req, res, next) => {
  const { params: { user } } = req;
  try {
    const result = await ordersServices.getSalesByUser(user);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

// Criar nova venda
const createNewSale = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await ordersServices.setNewSale(data);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  readSales,
  readSalesById,
  readSalesByUser,
  createNewSale,
};
