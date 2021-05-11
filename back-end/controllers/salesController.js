const {
  StatusCodes: { INTERNAL_SERVER_ERROR, OK },
} = require('http-status-codes');
const salesServices = require('../services/salesServices');

const saleRegister = async (req, res) => {
  try {
    const saleRegistered = await salesServices.saleRegister();
    console.log(saleRegistered);
    return res.status(OK).json(saleRegistered);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = {
  saleRegister,
};
