const { StatusCodes: { INTERNAL_SERVER_ERROR, OK } } = require('http-status-codes');
const productService = require('../services/productService');

const getAll = async (req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(OK).json(products);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

const getImageProduct = async (req, res) => {
  try {
    const { params: { name } } = req;
    const imagePath = `images/${name}`;
    return res.status(OK).download(imagePath);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = {
  getAll,
  getImageProduct,
};