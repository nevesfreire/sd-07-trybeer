const UserException = require('../exceptions/userException');
const userModel = require('../models/User');
const httpStatus = require('../helpers/httpStatus');
const userValidation = require('../helpers/validations/userValidation');

module.exports = {
  async get(credentials) {
    const { email, password } = credentials;

    userValidation.validateEmail(email);
    userValidation.validatePassword(password);

    const user = await userModel.getByEmailAndPassword(email, password);

    if (!user) {
      throw new UserException('Email ou senha incorreto', httpStatus.BAD_REQUEST);
    }

    return user;
  },
};
