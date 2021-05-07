const express = require('express');
const { getAllUsers, getByUserId, createLoginUser, createUser } = require('../users/controllers');
const { checkCreatingUserFields } = require('../middlewares/UserMiddleware');

const UsersRouter = express.Router();

UsersRouter.get('/users', getAllUsers);

UsersRouter.get('/users/:id', getByUserId);

UsersRouter.post('/users/login', createLoginUser);

UsersRouter.post('/users', [checkCreatingUserFields], createUser);

module.exports = UsersRouter;
