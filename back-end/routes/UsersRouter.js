const express = require('express');
const { getAllUsers, getByUserId, createLoginUser } = require('../users/controllers');

const UsersRouter = express.Router();

UsersRouter.get('/users', getAllUsers);

UsersRouter.get('/users/:id', getByUserId);

UsersRouter.post('/login', createLoginUser);

module.exports = UsersRouter;
