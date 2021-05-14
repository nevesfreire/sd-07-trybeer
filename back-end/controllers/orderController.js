const orderService = require('../services/orderService');
const OK = 200;
const ERROR = 400;
const ERRORBYID = 404;
const getAllOrders = async (_request, response) => {
  try {
    const order = await orderService.getAllOrders();
    return response.status(OK).json(order);
  } catch (error) {
    console.error(error);
    response.status(ERROR).json({ message: error.message });
  }
};
const getOrderById = async (request, response) => {
  try {
    const { id } = request.params;
    const order = await orderService.getOrderById(id);
    console.log(order)
    if (!order || Object.keys(order).length === 0) {
      const ERR_MESSAGE = 'order not found';
      throw new Error(ERR_MESSAGE);
    }
    return response.status(OK).json(order);
  } catch (error) {
    const { message } = error;
    return response.status(ERRORBYID).json({ message });
  }
};
const getOrderDetails = async (request, response) => {
  try {
    const { id } = request.params;
    const order = await orderService.getOrderDetails(id);
    if (!order || Object.keys(order).length === 0) {
      const ERR_MESSAGE = 'order not found';
      throw new Error(ERR_MESSAGE);
    }
    return response.status(OK).json(order);
  } catch (error) {
    const { message } = error;
    return response.status(ERROR).json({ message });
  }
};
module.exports = { getAllOrders, getOrderById, getOrderDetails };