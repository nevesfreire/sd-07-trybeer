const { StatusCodes } = require('http-status-codes');

const service = require('./service');

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await service.getOrderById(id);
    res.status(StatusCodes.OK).json(sale);
  } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
};
  
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
    const { id } = req.params;
    const sales = await service.getAllByUserId(id);
    res.status(StatusCodes.OK).json(sales);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getByOrderId = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = await service.getByOrderId(id);
    res.status(StatusCodes.OK).json(sales);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getById = async (req, res) => {
  try {
    const { id: salesId } = req.params;
    const sales = await service.getById(salesId);
    res.status(StatusCodes.OK).json(sales);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const { error, message } = await service.updateStatus(status, id);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json({ error, message });
    res.status(StatusCodes.OK).json({ message });
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
  getByOrderId,
  getById,
  getOrderById,
  updateStatus,
  create,
 };
