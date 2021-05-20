const UserException = require('../../exceptions/userException');
const httpStatus = require('../httpStatus');

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z0-9-]+)+$/;
  if (!email) {
    throw new UserException('O campo "email" é obrigatório.', httpStatus.BAD_REQUEST);
  }
  if (!regex.test(String(email).toLowerCase())) {
    throw new UserException('O campo "email" deve ser válido.', httpStatus.BAD_REQUEST);
  }
};

const validatePassword = (password) => {
  const minLength = 6;
  if (!password) {
    throw new UserException('O campo "password" é obrigatório.', httpStatus.BAD_REQUEST);
  }
  if (password.length < minLength) {
    throw new UserException('O campo "password" deve ser válido.', httpStatus.BAD_REQUEST);
  }
};

module.exports = {
  validateEmail,
  validatePassword,
};
