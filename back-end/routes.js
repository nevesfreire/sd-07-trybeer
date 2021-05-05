const express = require('express');

const app = express();

const { loginMiddleware } = require('./src/middlewares/index');
const { loginController } = require('./src/controllers/index');

app.post('/login', loginMiddleware, loginController);

module.exports = app;
