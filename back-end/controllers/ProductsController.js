const { productService } = require('../services');

const getAllProducts = async (_req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

const updateProduct = async (_req, res) => {
  try {
    res.status(200).json({ message: 'Atualizou' });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  getAllProducts,
  updateProduct,
};