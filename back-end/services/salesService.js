const salesModel = require('../models/salesModels');
const { errorInDb, OK } = require('./dictionaries/statusMsgMap');

const getAll = async () => {
  try {
    const sales = await salesModel.getAll();
    return { sales, ...OK };
  } catch (error) {
    return errorInDb;
  }
};

module.exports = { getAll };
