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

const getAllSalesData = async (req, res) => {
  try {
    const sales = await salesServices.getAllSalesData();
    const { message, http } = sales;
    return res.status(http).json(message);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

const getSalesDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await salesServices.getSalesDataById(id);
    const { message, http } = sales;
    return res.status(http).json(message);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

const changeStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderStatusChanged = await salesServices.changeStatusById(id);
    console.log('Controller', orderStatusChanged);
    const { message, http } = orderStatusChanged;
    return res.status(http).json(message);
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = {
  saleRegister,
  getAllSalesData,
  getSalesDataById,
  changeStatusById,
};
