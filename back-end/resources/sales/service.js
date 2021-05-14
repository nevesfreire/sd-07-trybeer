const model = require('./model');
const { statusIsValid } = require('../../helpers/validations');
const { invalidData, statusUpdated, saleNotFound } = require('../../helpers/dictonary');

const getOrderById = async (id) => {
 const sale = await model.getOrderById(id);
 if (!sale) return { error: true, message: saleNotFound };
 return sale;
};

const updateStatus = async (status, id) => {
  if (!statusIsValid(status)) return { error: true, message: invalidData };
  await model.updateStatus(status, id);
  return { error: false, message: statusUpdated };
};

const getAll = async () => (model.getAll());
const getAllByUserId = async (userId) => (model.getAllByUserId(userId));
const getByOrderId = async (orderId) => (model.getByOrderId(orderId));
const getById = async (salesId) => (model.getById(salesId));
const create = async (sale, products) => (model.create(sale, products));

module.exports = { 
  getAll, 
  getAllByUserId,
  getById,
  getOrderById,
  updateStatus,
  create,
  getByOrderId,
};
