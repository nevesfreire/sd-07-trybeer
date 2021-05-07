const { v4 } = require('uuid');
const SalesService = require('../service/SaleService');

const create = async (req, res) => {
  // UserId DeliveryAdress DeliveryNumber {productId: quantity}
  const { deliveryAddress, listProducts } = req.body;
  const deliveryNumber = v4();
  const { authorization } = req.headers;
  try {
    const newSale = await SalesService.create(
      deliveryAddress,
       deliveryNumber,
       listProducts,
       authorization,
    );
    return res.status(200).json(newSale);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  const { authorization } = req.headers;
  try {
    const allSales = await SalesService.getAll(authorization);
    return res.status(200).json(allSales);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getByNumber = async (req, res) => {
  const { numeroDoPedido } = req.params;
  try {
    const sale = await SalesService.getSaleByOrderNumber(numeroDoPedido);
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await SalesService.getAllOrders();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { create, getAll, getByNumber, getAllOrders };
