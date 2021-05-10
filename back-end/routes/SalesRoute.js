const routes = require('express').Router();
const { salesCtrl } = require('../controllers');

routes.get('/', salesCtrl.getAll);

module.exports = routes;