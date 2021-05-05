const { StatusCodes } = require('http-status-codes');
const productsModel = require('../models/productsModel');

const requireProducts = async (_request, response) => {
  try {
    const products = await productsModel.getAllProducts();
    if (!products) {
      return response.status(StatusCodes.NOT_FOUND)
        .json({ message: 'nenhum produto encontrado' });
    }
    return response.status(StatusCodes.OK)
      .json(products);
  } catch (error) {
    console.error(error);
    return response.status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
};

module.exports = { requireProducts };