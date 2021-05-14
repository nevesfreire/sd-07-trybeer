const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/application');

const generateToken = ({ name, email, role, id }) => {
  const payload = {
    name,
    email,
    role,
    id,
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