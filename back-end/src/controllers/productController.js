const productService = require('../services/productService');

const getAllProducts = async (_req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(201).json(products);
  } catch (error) {
    const { message, code } = error;
    if (code) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(500).json({
      message,
    });
  }
};

module.exports = { 
  getAllProducts,
};
