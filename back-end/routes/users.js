const express = require('express');

const route = express.Router();
const { logUser, getUser, createUser } = require('../controllers/userController');

route.post('/login', logUser);
route.post('/signup', createUser);
route.get('/:id', getUser);

module.exports = route;