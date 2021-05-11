const salesService = require('../service/salesService');

const createSale = async (req, res) => {
  const { userId, totalPrice, deliveryAddress, deliveryNumber, arrayProducts } = req.body;
  try {
    const { lastId } = await
      salesService.createSale(userId, totalPrice, deliveryAddress, deliveryNumber);
    await salesService.salesProducts(lastId, arrayProducts);

    res.status(201).json({ message: 'Compra em andamento!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSalesController = async (req, res) => {
  const { userId } = req.params;
  try {
    const arrayOfSales = await salesService.getSalesByIdService(userId);
    res.status(200).json(arrayOfSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsBySaleIdController = async (req, res) => {
  const { saleId } = req.params;
  try {
    const arrayOfProducts = await salesService.getProductsBySaleIdService(saleId);
    res.status(200).json(arrayOfProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStatusBySaleIdController = async (req, res) => {
  const { saleId } = req.body;
  try {
    await salesService.updateStatusBySaleIdService(saleId);
    res.status(201).json({ status: 'Status alterado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSale,
  getAllSalesController,
  getProductsBySaleIdController,
  updateStatusBySaleIdController,
};
