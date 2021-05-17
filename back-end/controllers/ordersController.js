const ordersService = require('../services/ordersService');
const httpStatus = require('./httpStatus');

const getOrdersByUser = async (req, res) => {
const errorMessage = { message: 'usuário sem pedidos' };
  try {
    const { id: userId } = req.user;
    const orders = await ordersService.getOrdersByUser(userId);

  res.status(httpStatus.OK).json(orders);
} catch (error) {
  res.status(httpStatus.BAD_REQUEST).json(errorMessage);
}
};

const getOrderById = async (req, res) => {
  const errorMessage = { message: 'pedido não cadastrado' };
    try {
      const { id } = req.params;
      const order = await ordersService.getOrderById(id);
    res.status(httpStatus.OK).json(order);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(errorMessage);
  }
  };

module.exports = {
  getOrdersByUser,
  getOrderById,
};
