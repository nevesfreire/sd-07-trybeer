const express = require('express');
const { orderController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const router = express.Router();

// (_, res) => { res.send('deu bom'); }
// Não esquecer de colocar o Middleware: authMiddleware.checkIfUserIsAuthenticated
router.get('/orders', authMiddleware.checkIfUserIsAuthenticated, orderController.getOrdersUser);
router.get('/admin/orders', authMiddleware.checkIfUserIsAuthenticated,
  orderController.getOrdersAdmin);
router.get('/orders/:id', authMiddleware.checkIfUserIsAuthenticated,
  orderController.getOrderDetails);

/*
 * /orders/:id - requisito 8
 * /admin/orders/:id - requisito 12
*/

module.exports = router;
