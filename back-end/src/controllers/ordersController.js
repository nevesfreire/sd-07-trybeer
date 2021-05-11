const { StatusCodes } = require('http-status-codes');
const userModel = require('../models/usersModel');

const allOrders = async (request, response) => {
  try {
    const { email } = request.body;
    const orders = await userModel.getOrders(email);

    return response.status(StatusCodes.OK).json(orders);
  } catch (error) {
    console.error(error);
    return response.status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message });
  }
};

module.exports = { allOrders };
