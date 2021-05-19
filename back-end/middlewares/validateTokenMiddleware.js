const jwt = require('jsonwebtoken');
const { loginModel } = require('../models');
const { SECRET } = require('../config/jwt');
require('dotenv').config();

const ERROR = { message: 'Invalid token' };
const validateTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const { email, password } = jwt.verify(token, SECRET);
    const [user] = await loginModel.getUserInfo({ email, password });
    if (await user.length === 0) throw ERROR;
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ err: { message: err.message } });
  }
};

module.exports = validateTokenMiddleware;