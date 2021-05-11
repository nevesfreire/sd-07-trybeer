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

const getOrderDetails = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await orderServices.getOrderDetails(id);
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

const getOrderDetailsAdmin = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await orderServices.getOrderDetails(id);
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    console.log('entrou aqui')
    response.status(error.status).json({ message: error.message });
  }
}

const changeStatus = async (request, response) => {
  try {
    const { id, situation } = request.body;
    const { authorization } = request.headers;
    const result = await orderServices.changeStatus(id, situation, authorization);
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(STATUS_CODE.BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = {
  getOrdersUser,
  getOrdersAdmin,
  getOrderDetails,
  changeStatus,
  getOrderDetailsAdmin,
};
