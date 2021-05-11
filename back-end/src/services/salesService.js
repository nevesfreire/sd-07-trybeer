const salesModel = require('../models/salesModel');

const INVALID_ENTRIES_MESSAGE = 'No entry can be undefined';

const verifyEntries = (id, price, address, number) => {
  const entries = [id, price, address, number];
  const bool = entries.some((element) => element === undefined);

  if (bool) {
    throw new Error(INVALID_ENTRIES_MESSAGE);
  }
};

// ------------------------------------------------------

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();
  return allSales;
};

const getSaleById = async (id) => {
  try {
    verifyEntries(id, null, null, null);

    const sale = await salesModel.getSaleById(id);
    return sale;
  } catch (error) {
    return error.message;
  }
};

const createSale = async (userId, totalPrice, delivery, cart) => {
  try {
    const { deliveryAddress, deliveryNumber } = delivery;

    verifyEntries(userId, totalPrice, deliveryAddress, deliveryNumber);

    const newSale = await salesModel.createSale(
      userId,
      totalPrice,
      { deliveryAddress, deliveryNumber },
      cart,
    );
    return newSale;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getAllSales, createSale, getSaleById };
