const { StatusCodes: { UNAUTHORIZED } } = require('http-status-codes');
const { userEmailorName } = require('../messages');

const NameValidation = async (req, res, next) => {
  const minEmailLenght = 12;
  const { name } = req.body;
  
  if (!name.lengh >= minEmailLenght) {
    return res.status(UNAUTHORIZED).json(userEmailorName);
  }
  next();
};

module.exports = {
  NameValidation,
};