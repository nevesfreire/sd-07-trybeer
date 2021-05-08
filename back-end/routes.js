const express = require('express');
const { body } = require('express-validator');

const app = express();

const { loginMiddleware } = require('./src/middlewares/index');
const { loginController } = require('./src/controllers/index');
const { registerController } = require('./src/controllers');
const { getUser } = require('./src/controllers');
const { productController } = require('./src/controllers');
const { fieldValidator } = require('./src/middlewares');

app.post('/login', loginMiddleware, loginController);

app.get('/', getUser);

app.post(
  '/',
  body('name').isString().isLength({ min: 12 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  fieldValidator,
  registerController,
);

app.get('/products', productController);

app.post('/', body('name').isString().isLength({ min: 12 }),
              body('email').isEmail(),
              body('password').isLength({ min: 6 }), fieldValidator, registerController);

module.exports = app;
