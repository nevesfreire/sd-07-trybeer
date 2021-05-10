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

module.exports = {
  createSale,
};
