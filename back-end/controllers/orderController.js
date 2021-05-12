const Order = require('../services/OrderService');

const getOrderDetails = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  try {
    const { statusCode, orderDetails } = await Order.getOrderDetails(token, id);
    res.status(statusCode).json({ statusCode, orderDetails });
  } catch (error) {
    next(error);
  }
};

const closeOrder = async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  try {
    const { statusCode, message } = await Order.closeOrder(token, id);
    res.status(statusCode).json({ statusCode, message });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrderDetails,
  closeOrder,
};