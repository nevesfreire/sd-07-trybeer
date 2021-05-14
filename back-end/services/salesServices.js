const {
  StatusCodes: { UNAUTHORIZED, OK },
} = require('http-status-codes');
const salesModel = require('../models/salesModel');
const userModel = require('../models/userModel');
const { userNotFound, saleRegisteredMessage } = require('../messages');

const customAnswer = (message, http = UNAUTHORIZED) => ({
  http,
  message,
});

const saleRegister = async (orderData) => {
  const { email, price, address, deliveryNumber, salesStatus, products } = orderData;
  const userId = await userModel.getUserIdByEmail(email);
  if (!userId) return customAnswer(userNotFound);
  const saleRegistered = await salesModel.saleRegister({
    id: userId,
    price,
    address,
    deliveryNumber,
    salesStatus,
  });
  const saleId = saleRegistered.insertId;
  await salesModel.saleProductRegister(products, saleId);
  return customAnswer(saleRegisteredMessage, OK);
};

const getAllSalesData = async () => {
  const sales = await salesModel.getAllSalesData();
  if (!sales) {
    return customAnswer([], OK);
  }
  return customAnswer(sales, OK);
};

const getSalesDataById = async (id) => {
  const orderDetail = await salesModel.getSalesDataById(id);
  return customAnswer(orderDetail, OK);
};

module.exports = {
  saleRegister,
  getAllSalesData,
  getSalesDataById,
};
