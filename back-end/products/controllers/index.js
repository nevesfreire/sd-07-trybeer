const { StatusCodes } = require('http-status-codes');
const model = require('../models');
// const service = require('../services');

const getAllProducts = async (req, res, next) => {
  try {
    const users = await model.getAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.error(error);
    next({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
};
