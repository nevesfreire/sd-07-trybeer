const salesService = require('../services/salesService');
const httpStatus = require('./httpStatus');
const createSale = async (req, res) => {
try {
  const { user_id, total_price, delivery_address, delivery_number, sale_date, status } = req.body;
  console.log(req.body);
  await salesService.createSale(user_id, total_price, delivery_address, delivery_number, sale_date, status);

  res.status(httpStatus.CREATED).json({ message: "pedido cadatrado com sucesso" });
} catch (error) {
  res.status(httpStatus.BAD_REQUEST).json({ message: "erro ao cadastrar pedido" });
}
};

module.exports = {
  createSale,
};
