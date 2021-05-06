const ProductService = require('../service/ProductService');

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await ProductService.getAll();
    return res.status(200).json(allProducts[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllProducts };
