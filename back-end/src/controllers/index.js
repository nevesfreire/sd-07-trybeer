const { loginController } = require('./loginController');
const { registerController } = require('./registerController');
const { getUser } = require('./registerController');
const productController = require('./productController');

module.exports = {
  loginController,
  registerController,
  getUser,
  productController,
};
