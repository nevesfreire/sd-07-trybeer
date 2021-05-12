const login = require('../models/login');
const jwt = require('jsonwebtoken');
const httpStatus = require('../controllers/httpStatus');
const secret = require('../controllers/login');
// const secret = "meusegredoparajwt";

const noTokenMessage = { message: "Token não encontrado ou informado" }
const userNotFound = { message: "Erro ao procurar usuário do token." }

const validateToken = async (req, res, next) => { 
  const token = req.headers.authorization;
  if(!token)
    return res.status(httpStatus.UNAUTHORIZED).json(noTokenMessage);
  try {
    const decoded = jwt.verify(token, secret);
    const user = await login.loginModel(decoded.data[1]);
    if(!user)
      return res.status(httpStatus.UNAUTHORIZED).json(userNotFound);
      req.user = user;
      next();
  } catch (error) {
    res.status(httpStatus.UNAUTHORIZED).json({ message: error.message });
  }
};

module.exports = validateToken;
