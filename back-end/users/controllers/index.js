const { StatusCodes } = require('http-status-codes');
const model = require('../models');
const service = require('../services');
const middleware = require('../../middlewares/AuthMiddleware');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await model.getAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.error(error);
    next({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    });
  }
};

const getByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.validateUserId(id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error(error);
    next({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    });
  }
};

const createLoginUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await middleware.validateCreateLoginToken(email);
    res.status(StatusCodes.OK).json(
      token,
    );
  } catch (error) {
    console.error(error);
    next({
      status: StatusCodes.BAD_REQUEST,
      message: error.message,
    });
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await service.validateCreateUser(name, email, password, role);
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    console.error(error);
    next({
      status: StatusCodes.BAD_REQUEST,
      message: error.message,
    });
  }
};

const alterUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await service.alterUser(name, email);
    console.log('userController', user);
    res.status(StatusCodes.OK).json(user); 
  } catch (error) {
    next({
      status: StatusCodes.NO_CONTENT,
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getByUserId,
  createLoginUser,
  createUser,
  alterUser,
};
