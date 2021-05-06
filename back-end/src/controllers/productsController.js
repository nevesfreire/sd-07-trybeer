const STATUS_OK = 200;

const productsService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const result = await productsService.getAllProducts();

  res.status(STATUS_OK).json({ products: result });
};

module.exports = { getAllProducts };
