const Order = require('../services/OrderService');

const getOrder = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const { statusCode, orders } = await Order.getOrder(token);
    res.status(statusCode).json({ statusCode, orders });
  } catch (error) {
    next(error);
  }
};

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
  getOrder,
  getOrderDetails,
  closeOrder,
};