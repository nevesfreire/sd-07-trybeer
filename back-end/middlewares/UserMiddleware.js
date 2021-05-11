const { StatusCodes } = require('http-status-codes');
const { throwError } = require('../helpers');

const checkCreatingUserFields = (req, _res, next) => {
  try {
    const { name, email, password, role } = req.body;
    throwError(!name || !email || !password || !role, 'fields not found');
    next();
  } catch (error) {
    next({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    });    
  }
};

module.exports = {
  checkCreatingUserFields,
};