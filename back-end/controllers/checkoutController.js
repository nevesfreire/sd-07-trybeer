const checkoutService = require('../services/checkoutService');
const httpStatus = require('./httpStatus');

const createSale = async (req, res) => {
const sucessMessage = { message: 'pedido cadastrado com sucesso' };
const errorMessage = { message: 'erro ao cadastrar pedido' };
  try {
  const { totalPrice, deliveryAddress, deliveryNumber } = req.body;
  const { id: userId } = req.user;
  const saleDate = new Date();
  const status = 'SALVO';
  const data = {
    userId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status };
  await checkoutService.createSale(data);
  
  res.status(httpStatus.CREATED).json(sucessMessage);
} catch (error) {
  res.status(httpStatus.BAD_REQUEST).json(errorMessage);
}
};

module.exports = {
  createSale,
};
