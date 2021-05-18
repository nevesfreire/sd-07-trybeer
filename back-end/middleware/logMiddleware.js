const logMiddleware = (req, res, next) => {
  console.log('---- Middleware de Log ----');
  console.log('Verbo/rota:', req.method, req.path);
  console.log('Body:', req.body);
  console.log('Params:', req.params);
  console.log('Query:', req.query);
  console.log('----  ----');
  next();
};

module.exports = logMiddleware;
