const { StatusCodes } = require('http-status-codes');

const invalidData = {
  isError: true,
  status: StatusCodes.BAD_REQUEST,
  message: 'Errou!',
};

const userAlredyExists = {
  isError: true,
  status: StatusCodes.UNAUTHORIZED,
  message: 'Usuario ja cadastrado!',
}

const invalidToken = {
  isError: true,
  status: StatusCodes.UNAUTHORIZED,
  message: 'Token invalido',
}

module.exports = {
  invalidData,
  userAlredyExists,
  invalidToken,
};
