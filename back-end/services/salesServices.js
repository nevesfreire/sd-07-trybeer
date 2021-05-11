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
  const { email, price, address, deliveryNumber, saleDate, salesStatus, products } = orderData;
  const userId = await userModel.getUserIdByEmail(email);
  if (!userId) return customAnswer(userNotFound);
  // const saleRegistered = await salesModel.saleRegister({
  //   id: userId,
  //   price,
  //   address,
  //   deliveryNumber,
  //   saleDate,
  //   salesStatus,
  // });
  // const saleId = saleRegistered.insertId;
  const testando = await salesModel.saleProductRegister(products);
  console.log('teste', testando);
  return customAnswer(saleRegisteredMessage, OK);
};

module.exports = {
  saleRegister,
};
