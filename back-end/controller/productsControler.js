const productsAll = require('../model/productsModel');

const getAllProducts = async (req, res) => {
  try {
    const products = await productsAll.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getAllProducts,
};