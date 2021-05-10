const Sale = require('../services/SaleService');

const create = async (req, res, next) => {
  const token = req.headers.authorization;
  const { total, deliveryAddress, deliveryNumber } = req.body;

  try {
    const { statusCode, message } = await Sale
      .create(token, total, deliveryAddress, deliveryNumber);
    res.status(statusCode).json({ statusCode, message });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};