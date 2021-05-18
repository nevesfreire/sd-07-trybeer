const productService = require('../services/productService');

const OK = 200;
const ERROR = 400;
const ERRORBYID = 404;
const ERR_MESSAGE_PRODUCT = 'product not found';
const getAllProducts = async (_request, response) => {
  try {
    const product = await productService.getAllProducts();
    if (!product || Object.keys(product).length === 0) {
      throw new Error(ERR_MESSAGE_PRODUCT);
    }
    return response.status(OK).json(product);
  } catch (error) {
    console.error(error);
    response.status(ERROR).json({ message: error.message });
  }
};
const getProductById = async (request, response) => {
  try {
    const { id } = request.params;
    const product = await productService.getProductById(id);
    if (!product || Object.keys(product).length === 0) {
      throw new Error(ERR_MESSAGE_PRODUCT);
    }
    return response.status(OK).json(product);
  } catch (error) {
    const { message } = error;
    return response.status(ERRORBYID).json({ message });
  }
};
module.exports = { getAllProducts, getProductById };
