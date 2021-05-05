const jwt = require('../helper/jwt');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!jwt.validateToken(authorization)) {
    res.status(400).send({ message: 'token inválido' });
  }
  next();
};
