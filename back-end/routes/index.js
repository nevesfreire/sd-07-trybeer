const routes = require('express').Router();
const loginRoute = require('../controllers/loginController');

routes.use('/login', loginRoute);

module.exports = routes;