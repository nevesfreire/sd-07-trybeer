const { StatusCodes } = require('http-status-codes');
const userModel = require('../models/ordersModel');

const allOrders = async (request, response) => {
  try {
    const { email } = request.headers;
    const orders = await userModel.getOrders(email);

    return response.status(StatusCodes.OK).json(orders);
  } catch (error) {
    console.error(error);
    return response.status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
};

module.exports = { allOrders };
