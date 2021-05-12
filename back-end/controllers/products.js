const httpStatus = require('./httpStatus');
const { getAllProductsService } = require('../services/products');

const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.status(httpStatus.OK).json(products);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
};