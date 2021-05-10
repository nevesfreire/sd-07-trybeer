const { STATUS_CODE } = require('../helpers');
const { orderServices } = require('../services');

const getOrdersUser = async (request, response) => {
  try {
    const { authorization } = request.headers;
    const result = await orderServices.getOrdersUser(authorization);
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

const getOrdersAdmin = async (request, response) => {
  try {
    const { authorization } = request.headers;
    const result = await orderServices.getOrdersAdmin(authorization);
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getOrdersUser,
  getOrdersAdmin,
};
