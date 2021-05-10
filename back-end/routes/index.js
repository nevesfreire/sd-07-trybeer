const routes = require('express').Router();
const loginRoute = require('./loginRoute');
const registerRoute = require('./registerRoute');
const productsRouter = require('./productsRouter');
const saleRoute = require('./saleRoute');

routes.use('/login', loginRoute);
routes.use('/register', registerRoute);
routes.use('/products', productsRouter);
routes.use('/sale', saleRoute);

module.exports = routes;