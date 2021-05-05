const routes = require('express').Router();
const loginRoute = require('./loginRoute');
const registerRoute = require('./registerRoute');

routes.use('/login', loginRoute);
routes.use('/register', registerRoute)

module.exports = routes;