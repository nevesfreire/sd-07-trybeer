const checkoutService = require('../services/checkoutService');

const CREATE = 201;
const OK = 200;
const ERROR = 400;
const CONFLICT = 409;

const getAllSales = async (request, response) => {
  try {
      const sale = await checkoutService.getAllSales();
    return response.status(OK).json(sale);
  } catch (error) {
    console.error(error);
    response.status(ERROR).json({ message: error.message });
  }
};

const getSaleById = async (request, response) => {
  try {
    const { id } = request.params;
    const sale = await checkoutService.getSaleById(id);
    if (!sale) {
      const ERR_MESSAGE = 'sale not found';
      throw new Error(ERR_MESSAGE);
    }
    return response.status(OK).json(sale);
  } catch (error) {
    const { message } = error;
    return response.status(ERROR).json({ message });
  }
};

const createSale = async (request, response) => {
  try {
    const objParams = { ...request.body };
    const sale = await checkoutService.createSale(objParams);
    return response.status(CREATE).json(sale);
  } catch (error) {
    console.error(error);
    const { message } = error;
    if (message.includes('registered')) {
      return response.status(CONFLICT).json({ message });
    }
    response.status(ERROR).json({ message: error.message });
  }
};

module.exports = { getAllSales, getSaleById, createSale };
