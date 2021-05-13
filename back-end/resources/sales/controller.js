const { StatusCodes } = require('http-status-codes');

const service = require('./service');

const getAll = async (_req, res) => {
  try {
    const sales = await service.getAll();
    res.status(StatusCodes.OK).json(sales);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getAllByUserId = async (req, res) => {
  try {
    const { userId } = req.body;
    const sales = await service.getAllByUserId(userId);
    res.status(StatusCodes.OK).json(sales);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getById = async (req, res) => {
  try {
    const { id: salesId } = req.params;
    const sales = await service.getAllByUserId(salesId);
    res.status(StatusCodes.OK).json(sales);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const create = async (req, res) => {
  try {
    const { sale, products } = req.body;
    await service.create(sale, products);
    res.status(StatusCodes.CREATED).send();
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { 
  getAll,
  getAllByUserId,
  getById,
  create,
 };
