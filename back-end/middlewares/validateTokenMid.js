const jwt = require('jsonwebtoken');
const modelUser = require('../models/userModel');

const validateToken = async (request, response, next) => {
  const token = request.headers.authorization;
  console.log(token)
  if (!token) {
    const ERROR = 401;
    return response.status(ERROR).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await modelUser.getById(decoded.id);

    if (!user) {
      const ERROR = 401;
      response.status(ERROR).json({ message: 'missing auth token' });
    }
    request.user = user;
    next();
  } catch (error) {
    return response.status(401).json({ message: error.message });
  }
};

module.exports = validateToken;
