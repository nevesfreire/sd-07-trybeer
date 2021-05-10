const SalesService = require('../service/SaleService');

const create = async (req, res) => {
  // UserId DeliveryAdress DeliveryNumber {productId: quantity}
  const { deliveryAddress, deliveryNumber, listProducts } = req.body;
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
  try {
    const allSales = await SalesService.getAll();
    return res.status(200).json(allSales);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const allSalesById = await SalesService.getById(id);
    return res.status(200).json(allSalesById);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { create, getAll, getById };
