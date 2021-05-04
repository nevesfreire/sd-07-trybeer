const jwt = require('../helper/jwt');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!jwt.validateToken(authorization)) {
    res.status(400).send({ message: 'token inválido' });
  }
  next();
};
