const UserException = require('../exceptions/userException');
const httpStatus = require('../helpers/httpStatus');

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z0-9-]+)+$/;
  if (!email) {
    throw new UserException('O campo "email" é obrigatório.', httpStatus.BAD_REQUEST);
  }
  if (!regex.test(String(email).toLowerCase())) {
    throw new UserException('O campo "email" deve ser válido.', httpStatus.BAD_REQUEST);
  }
};

module.exports = {
  get(user) {
    const { email } = user;
    validateEmail(email);
  },
};
