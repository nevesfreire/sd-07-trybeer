const { STATUS_CODE } = require('../helpers');
const { saleServices } = require('../services');

const createSale = async (request, response) => {
  try {
    console.log('entrou no controller')
    const { email, total_price, delivery_address, delivery_number, products_sales } = request.body;
    // const { authorization } = request.headers;
    const result = await saleServices.createSale(email, total_price, delivery_address, delivery_number, products_sales);
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(STATUS_CODE.BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = {
  createSale,
};