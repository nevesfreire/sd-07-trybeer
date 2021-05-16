const { loginController } = require('./loginController');
const { registerController } = require('./registerController');
const { getUser } = require('./registerController');
const { getOrderByUser } = require('./getOrderByUserController');
const productController = require('./productController');

module.exports = {
  loginController,
  registerController,
  getUser,
  productController,
  getOrderByUser,
};
