const jwt = require('jsonwebtoken');
const { service } = require('../user');
const { emailIsValid, passwordIsValid } = require('../../helpers/validations');
const { userNotFound, emailOrPasswordInvalid } = require('../../helpers/dictonary');

const SECRET = 'TRYBEER';

const validateLogin = async (email, password) => {
  if (!emailIsValid(email) || !passwordIsValid(password)) {
    return {
      error: true,
      message: emailOrPasswordInvalid,
    };
  }
  const user = await service.getByEmail(email);
  if (!user) {
    return { error: true, message: userNotFound };
  }
  if (user.password !== password) {
    return { error: true, message: emailOrPasswordInvalid };
  }
  return { error: false, user };
};

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

const login = async (userEmail, password) => {
  const { error, message, user } = await validateLogin(userEmail, password);
  if (error) return { error, message };
  const token = generateToken(user);

  const { email, name, role } = user;
  return { error: false, payload: { token, name, email, role } };
};

module.exports = { login, tokenIsValid };
