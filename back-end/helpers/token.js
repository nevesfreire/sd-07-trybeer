const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/application');

const generateToken = ({ name, email, role }) => {
  const payload = {
    name,
    email,
    role,
  };

  return jwt.sign(payload, SECRET);
};

const tokenIsValid = (token) => {
  try {
      jwt.verify(token, SECRET);
      return true;
  } catch (error) {
      return false;
  }
};

module.exports = { 
  generateToken,
  tokenIsValid,
};