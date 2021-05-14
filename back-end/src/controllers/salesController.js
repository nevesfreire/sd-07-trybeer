const { StatusCodes } = require('http-status-codes');
const salesModel = require('../models/salesModel');
const { checkToken } = require('../services/productsSevice');
// no front enviar os dados em camelCase
const sales = async (request, response) => {
  try {
    const token = request.headers.authorization;
    const user = await checkToken(token);
    
    const salesData = {
      userId: user.id,
      totalPrice: request.body.totalPrice,
      deliveryAddress: request.body.deliveryAddress,
      deliveryNumber: request.body.deliveryNumber,
      status: request.body.status,
    };
    const sale = await salesModel.createSale(salesData);
    await salesModel.createSalesProducts(sale.saleId, request.body.listproducts);
    return response.status(StatusCodes.OK).json(sale);
  } catch (error) {
    return response.status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
};

const getAllSales = async (_request, response) => {
  try {
    const result = await salesModel.getAllSales();
    return response.status(StatusCodes.OK).json(result);
  } catch (error) {
    return response.status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
};

const getSaleById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await salesModel.getSaleById(id);
  return response.status(StatusCodes.OK).json(result);
  } catch (error) {
    return response.status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
};

module.exports = {
  sales,
  getAllSales,
  getSaleById,
};
