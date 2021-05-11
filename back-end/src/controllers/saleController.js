const saleService = require('../services/saleService');

const createSale = async (req, res) => {
  try {
    const { totalPrice, products, address } = req.body;
    const { id } = req.user;
    
    await saleService.createSale(id, totalPrice, products, address);

    res.status(201).json('Compra efetuada com sucesso');
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

const getSales = async (req, res) => {
  try {
    const { id, role } = req.user;
    const result = await saleService.getSales(id, role);
    res.status(201).json(result);
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

const getSaleByNumber = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const result = await saleService.getSaleByNumber(orderNumber);
    res.status(201).json(result);
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
  getSales,
  getSaleByNumber,
};
