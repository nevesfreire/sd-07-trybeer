const produtsService = require('../service/produtsService');

const getAllProducts = async (req, res) => {
  try {
    const products = await produtsService.productsAll();
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getAllProducts,
};