const { StatusCodes } = require('http-status-codes');

const invalidData = {
  isError: true,
  status: StatusCodes.BAD_REQUEST,
  message: 'Errou!',
};

module.exports = {
  invalidData,
};
