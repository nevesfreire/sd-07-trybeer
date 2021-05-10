const Product = require('../services/ProductService');

const findAll = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const { statusCode, products } = await Product.findAll(token);
    res.status(statusCode).json({ statusCode, products });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
};