const { STATUS_CODE } = require('../helpers');
const { productServices } = require('../services');

const getProductsList = async (request, response) => {
  try {
    const result = await productServices.getProductsList();
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(STATUS_CODE.BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = {
  getProductsList,
};
