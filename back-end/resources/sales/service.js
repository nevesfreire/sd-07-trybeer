const model = require('./model');
const { statusIsValid } = require('../../helpers/validations');
const { invalidData, statusUpdated, saleNotFound } = require('../../helpers/dictonary');

const getById = async (id) => {
 const sale = await model.getById(id);
 if (!sale) return { error: true, message: saleNotFound };
 return sale;
};

const updateStatus = async (status, id) => {
  if (!statusIsValid(status)) return { error: true, message: invalidData };
  await model.updateStatus(status, id);
  return { error: false, message: statusUpdated };
};

module.exports = { getById, updateStatus };