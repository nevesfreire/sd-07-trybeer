const { StatusCodes } = require('http-status-codes');
const { getAll } = require('../models');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAll();

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
  getAllUsers,
};
