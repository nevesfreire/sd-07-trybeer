const saleModel = require('../models/saleModel');

const getAllSales = async () => {
  const allSales = await saleModel.getAllSales();
  return allSales;
};

const getSaleById = async (id) => {
  const sale = await saleModel.getSaleById(id);
  return sale;
};

const createSale = async (ObjParams) => {
  const sale = await saleModel.createCheckout(ObjParams);
  return sale;
};

module.exports = { getAllSales, getSaleById, createSale };