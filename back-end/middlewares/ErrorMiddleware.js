const errorMiddleware = (err, _req, res, _next) => {
  const { status, message } = err;
  return res.status(status).json({
    message: message,
  });
};

module.exports = errorMiddleware;
