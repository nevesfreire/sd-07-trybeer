const { validateToken } = require('../auth');
const { STATUS_CODE, STATUS_MESSAGE } = require('../helpers');

const checkIfUserIsAuthenticated = (request, response, next) => {
  const token = request.headers.authorization;
  
  if(!token) {
    return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: STATUS_MESSAGE.MISSING_TOKEN })
  }
  if(validateToken.tokenIsValid(token)) {
    return next();
  }

  return response.status(STATUS_CODE.UNAUTHORIZED).json({ message: STATUS_MESSAGE.MALFORMED_TOKEN})
}

module.exports = {
  checkIfUserIsAuthenticated,
}