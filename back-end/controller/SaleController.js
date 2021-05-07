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

module.exports = { create };
