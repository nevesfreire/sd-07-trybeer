const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;

const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
  const result = await salesService.getAllSales();

  res.status(STATUS_OK).json({ sales: result });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.getSaleById(id);

  if (typeof result === 'string') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else {
    res.status(STATUS_OK).json(result);
  }
};

const createSale = async (req, res) => {
  const { userId, totalPrice, deliveryAddress, deliveryNumber, cart } = req.body;

  const result = await salesService.createSale(
    userId,
    totalPrice,
    { deliveryAddress, deliveryNumber },
    cart,
  );

  if (typeof result === 'string') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else {
    res
      .status(STATUS_CREATED)
      .json({ sale: result, message: 'Compra realizada com sucesso!' });
  }
};

const changeSaleStatus = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.changeSaleStatus(id);

  if (typeof result === 'string') {
    res.status(STATUS_BAD_REQUEST).json({ message: result });
  } else {
    res.status(STATUS_CREATED).json({ message: 'Alterado status com sucesso' });
  }
};

module.exports = { getAllSales, createSale, getSaleById, changeSaleStatus };
