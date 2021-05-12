const {
  StatusCodes: { INTERNAL_SERVER_ERROR },
} = require('http-status-codes');
const salesServices = require('../services/salesServices');

const saleRegister = async (req, res) => {
  try {
    const saleRegistered = await salesServices.saleRegister(req.body);
    const { message, http } = saleRegistered;
    return res.status(http).json(message);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = {
  saleRegister,
};
