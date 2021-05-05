const { StatusCodes } = require('http-status-codes');
const { checkToken } = require('../services/productsSevice');

const validadeToken = (request, response, next) => {
  const token = request.headers.authorization;
  try {
    if (!checkToken(token)) {
      return response.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'token inválido' });
    }
    next();
  } catch (error) {
    return response.status(StatusCodes.BAD_REQUEST)
    .json({ message: error.message });
  }
};

module.exports = {
  validadeToken,
};
