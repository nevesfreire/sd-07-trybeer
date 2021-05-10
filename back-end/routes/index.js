const routes = require('express').Router();
const loginRoute = require('./loginRoute');
const registerRoute = require('./registerRoute');
const productsRouter = require('./productsRouter');

routes.use('/login', loginRoute);
routes.use('/register', registerRoute);
routes.use('/products', productsRouter);

module.exports = routes;