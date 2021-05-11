const orderModel = require('../models/orderModel');

const getAllOrders = async () => {
  const allOrders = await orderModel.getAllOrders();
  return allOrders;
};
const getOrderById = async (id) => {
  const allOrder = await orderModel.getOrderById(id);
  return allOrder;
};

const getOrderDetails = async (id) => {
  const order = await orderModel.getOrderDetails(id);
  return order;
};

module.exports = { getAllOrders, getOrderById, getOrderDetails };
