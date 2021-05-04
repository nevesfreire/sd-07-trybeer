const { productModel } = require('../models');

const getAllProducts = async (_req, res) => {
  try {
    const products = await productModel.getAllProducts();
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

module.export = {
  getAllProducts,
  updateProduct,
};