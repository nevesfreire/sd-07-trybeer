const Sale = require('../services/SaleService');

const create = async (req, res, next) => {
  const token = req.headers.authorization;
  const { orderItems, orderDetails } = req.body;

  try {
    const { statusCode, message } = await Sale
      .create(token, orderItems, orderDetails);
    res.status(statusCode).json({ statusCode, message });
  } catch (error) {
    next(error);
  }
};

const findByUserId = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const { statusCode, sales } = await Sale.findByUserId(token);
    res.status(statusCode).json({ statusCode, sales });
  } catch (error) {
    next(error);
  }
};

const findSaleDetailsById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { statusCode, saleDetails } = await Sale.findSaleDetailsById(id);
    res.status(statusCode).json({ statusCode, saleDetails });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  findByUserId,
  findSaleDetailsById,
};