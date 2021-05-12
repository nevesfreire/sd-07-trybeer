const checkoutService = require('../services/checkoutService');
const httpStatus = require('./httpStatus');

const createSale = async (req, res) => {
const sucessMessage = { message: "pedido cadastrado com sucesso" }
const errorMessage = { message: "erro ao cadastrar pedido" }
  try {
  const { total_price, delivery_address, delivery_number } = req.body;
  const { id: user_id } = req.user;
  const sale_date = new Date();
  const status = "SALVO"
  const data = {
    user_id, total_price, delivery_address, delivery_number, sale_date, status };
  await checkoutService.createSale(data);
  
  res.status(httpStatus.CREATED).json(sucessMessage);
} catch (error) {
  res.status(httpStatus.BAD_REQUEST).json(errorMessage);
}
};

module.exports = {
  createSale,
};
