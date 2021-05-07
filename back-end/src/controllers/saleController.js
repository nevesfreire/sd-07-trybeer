const saleService = require('../services/saleService');

const createSale = async (req, res) => {
  try {
    const { totalPrice, products, address } = req.body;
    const { id } = req.user;
    const newSale = await saleService.createSale(id, totalPrice, products, address);
    res.status(201).json(newSale);
  } catch (error) {
    const { message, code } = error;
    if (code) {
      return res.status(code).json({
        message,
      });
    }
    return res.status(500).json({
      message,
    });
  }
};

module.exports = { 
  createSale,
};
