const { STATUS_CODE } = require('../helpers');
const { saleServices } = require('../services');

const createSale = async (request, response) => {
  try {
    const purchaseRequest = request.body;
    const result = await saleServices.createSale(purchaseRequest);
    response.status(STATUS_CODE.SUCCESS).json({ message: result });
  } catch (error) {
    response.status(STATUS_CODE.BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = {
  createSale,
};
