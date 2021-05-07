const CODE = require('../helper/statusCodes');

module.exports = (err, _req, res, _next) => {
  console.error(`Erro: ${err.message}`);

  const statusCode = err.status ? err.status : CODE.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).json({ statusCode, message: err.message });
};