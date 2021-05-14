const model = require('./model');

const getAll = async () => (model.getAll());
const getAllByUserId = async (userId) => (model.getAllByUserId(userId));
const getById = async (salesId) => (model.getById(salesId));
const create = async (sale, products) => (model.create(sale, products));

module.exports = { 
  getAll, 
  getAllByUserId,
  getById,
  create,
};
