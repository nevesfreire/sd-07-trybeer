const { ordersModel } = require('../models');
const { errors } = require('../helpers');

const getSalesList = async () => {
  const result = await ordersModel.getSales();
  return result;
};

const getSalesById = async (id) => {
  const { sale } = await ordersModel.getSalesById(id);
  if (!sale) throw errors.invalidData;
  return sale;
};

const getSalesByUser = async (user) => {
  const sale = await ordersModel.getSalesByUser(user);
  if (!sale) throw errors.invalidData;
  return sale;
};

const setNewSale = async (newSale) => {
  const sale = await ordersModel.createSale(newSale);
  if (!sale) throw errors.invalidData;
  return sale;
};

module.exports = {
  getSalesList,
  getSalesById,
  getSalesByUser,
  setNewSale,
};
