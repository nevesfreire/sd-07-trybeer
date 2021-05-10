const express = require('express');
const { getAllProducts } = require('../products/controllers');
// const { checkCreatingUserFields } = require('../middlewares/UserMiddleware');

const ProductsRouter = express.Router();

ProductsRouter.get('/products', getAllProducts);

// UsersRouter.get('/users/:id', getByUserId);

// UsersRouter.post('/users/login', createLoginUser);

// UsersRouter.post('/users', [checkCreatingUserFields], createUser);

module.exports = ProductsRouter;
