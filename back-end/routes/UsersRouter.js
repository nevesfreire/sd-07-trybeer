const express = require('express');
const {getAllUsers} = require('../users/controllers');

const UsersRouter = express.Router();

UsersRouter.get('/users', getAllUsers);

module.exports = UsersRouter;