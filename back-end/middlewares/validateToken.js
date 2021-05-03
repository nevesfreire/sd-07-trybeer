const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = 'blitz';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "token not found"});

  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.getByEmail(decoded.data);
    if (!user) return res.status(401).json({ message: "user not found"});
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: ""});
  }
};

module.exports = validateToken;
