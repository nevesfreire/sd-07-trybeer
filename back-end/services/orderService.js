const Order = require('../models/OrderModel');
const CustomError = require('../helper/CustomError');
const { verifyToken } = require('../helper/AuthValidation');
const CODE = require('../helper/statusCodes');

const authRequired = (token) => {
  if (!token) throw new CustomError(CODE.UNAUTHORIZED, 'Necessário realizar autenticação');
  try {
    verifyToken(token);
  } catch (error) {
    throw new CustomError(error.status, error.message);
  }
};

const isAdmin = (token) => {
  const { admin } = verifyToken(token);
  if (!admin) throw new CustomError(CODE.UNAUTHORIZED, 'Usuário sem premissão');
};

const serializeOrder = (order) => ({
  id: order[0].id,
  orderStatus: order[0].status,
  total: order[0].total_price,
  orderItems: order.map((item) => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  })),
});

const getOrderDetails = async (token, orderId) => {
  try {
    authRequired(token);
    isAdmin(token);
    const order = await Order.getOrderDetails(orderId);
    const orderDetails = serializeOrder(order);
    return { statusCode: CODE.OK, orderDetails };
  } catch (error) {
    if (error.status) throw error;
    throw new CustomError(CODE.INTERNAL_SERVER_ERROR, 'Erro ao conectar com o banco de dados');
  }
};

module.exports = {
  getOrderDetails,
};