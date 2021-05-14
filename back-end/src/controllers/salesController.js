const saleService = require('../services/salesService');

const salesController = async (req, res) => {
    const { userId, totalPrice, deliveryAddress, deliveryNumber, status } = req.body;

    const payload = {
        userId,
        totalPrice,
        deliveryAddress,
        deliveryNumber,
        status,
    };

    await saleService.saveSales(payload);

    return res.status(201).json({ message: 'Compra realizada com sucesso!' });
};

module.exports = {
    salesController,
  };
