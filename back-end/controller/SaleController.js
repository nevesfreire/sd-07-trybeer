const SalesService = require('../service/SaleService');

const create = async (req, res) => {
  const sale = req.body;
  const { autorization } = req.headers;
  try {
    const newSale = await SalesService.create(sale, autorization);
    return res.status(200).json(newSale);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { create };
