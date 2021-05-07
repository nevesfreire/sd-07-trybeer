const express = require('express');
const { body } = require('express-validator');

const app = express();

const { loginMiddleware } = require('./src/middlewares');
const { loginController } = require('./src/controllers');
const { registerController } = require('./src/controllers');
const { fieldValidator } = require('./src/middlewares');

app.post('/login', loginMiddleware, loginController);

app.post('/', body('name').isString().isLength({ min: 12 }),
             body('email').isEmail(),
             body('password').isLength({ min: 6 }), fieldValidator, registerController);

module.exports = app;
