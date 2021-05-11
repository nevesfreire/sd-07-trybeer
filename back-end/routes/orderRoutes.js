const express = require('express');
const { orderController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = express.Router();

// (_, res) => { res.send('deu bom'); }
router.get('/orders', authMiddleware.checkIfUserIsAuthenticated, orderController.getOrdersUser);
router.get('/admin/orders', authMiddleware.checkIfUserIsAuthenticated,
  orderController.getOrdersAdmin);
router.get('/orders/:id', authMiddleware.checkIfUserIsAuthenticated,
  orderController.getOrderDetails);
router.get('/admin/orders/:id', authMiddleware.checkIfUserIsAuthenticated,
  orderController.getOrderDetailsAdmin);
router.put('/orders/status', authMiddleware.checkIfUserIsAuthenticated,
  orderController.changeStatus);

module.exports = router;
