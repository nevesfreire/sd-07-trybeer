const { saleService } = require('../services');

const createSale = async (req, res) => {
  try {
    const { body } = req;
    const result = await saleService.createSale(body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createSale,
};

// id, user_id, total_price, delivery_address, delivery_number, sale_date, status