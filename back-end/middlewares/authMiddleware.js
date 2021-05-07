const { tokenServices } = require('../services');
const { errors } = require('../helpers');

const authMiddleware = (req, resp, next) => {
  const token = req.headers.authorization;
  if (!token) throw errors.invalidToken;
  try {
    const result = tokenServices.verifyToken(token);
    req.user = result;
    next();
  } catch (error) {
    next(errors.invalidToken);  
  }
};

module.exports = authMiddleware;
