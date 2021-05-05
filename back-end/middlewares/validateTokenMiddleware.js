const jwt = require('jsonwebtoken');
const { loginModel } = require('../models');

require('dotenv').config();

const error = { message: 'Invalid token' };
const validateTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const { email, password } = jwt.verify(token, process.env.JWT_SECRET);
    const [user] = await loginModel.getUserInfo({ email, password });

    if (await user[0].password !== password) throw error;
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ err });
  }
};

module.exports = validateTokenMiddleware;