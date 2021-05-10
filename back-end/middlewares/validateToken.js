const jwt = require('jsonwebtoken');
const { loginModel } = require('../models/login');

const secret = 'meusegredoparajwt';

const validateTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new Error('Sem autorização');
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await loginModel(decoded.email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
  
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = validateTokenMiddleware;