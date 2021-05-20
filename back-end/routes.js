const express = require('express');

const routes = express.Router();

const authenticationController = require('./controllers/authenticationController');
const userController = require('./controllers/userController');

routes.post('/api/token', authenticationController.getToken);

routes.route('/users')
  .get(userController.get);

module.exports = routes;
