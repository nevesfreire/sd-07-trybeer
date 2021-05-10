const { productService } = require('../services');
const { OK, BADREQUEST } = require('./HttpCodes');

const getAllProducts = async (_req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(OK).json(products);
  } catch (error) {
    res.status(BADREQUEST).json({ err: { message: error.message } });
  }
};

module.exports = {
  getAllProducts,
};