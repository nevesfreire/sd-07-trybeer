const UserException = require('../exceptions/userException');
const httpStatus = require('../helpers/httpStatus');

const validateEmail = (email) => {
  if (!email) {
    throw new UserException('O campo "email" é obrigatório.', httpStatus.BAD_REQUEST);
  }
};

module.exports = {
  get(user) {
    const { email, password } = user;
    validateEmail(email);
  },
};
