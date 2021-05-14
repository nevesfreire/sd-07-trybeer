const { Router } = require('express');
const { ordersControllers } = require('../controllers');
const { authMiddleware, ordersListAdmin } = require('../middlewares');

const ordersRoute = Router();

// Todas os pedidos (adm)
ordersRoute.get('/', authMiddleware, ordersListAdmin, ordersControllers.readSales);

// Pedidos por id de pedidos
ordersRoute.get('/:id', authMiddleware, ordersControllers.readSalesById);

// Change status order
ordersRoute.put('/admin', authMiddleware, ordersControllers.changeStatus);

// Pedidos por id de usuário
ordersRoute.get('/user/:user', authMiddleware, ordersControllers.readSalesByUser);

// Login
ordersRoute.post('/', ordersControllers.createNewSale);

module.exports = ordersRoute;