const routes = require('express').Router();
const { salesCtrl } = require('../controllers');
const authMiddleware = require('../middlewares/auth');

routes.get('/', authMiddleware, salesCtrl.getAll);

module.exports = routes;