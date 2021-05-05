const jwt = require('jsonwebtoken');
const { service } = require('../user');
const { emailIsValid, passwordIsValid } = require('../../helpers/validations');
require('dotenv').config();

const validateLogin = async (email, password) => {
  if (!emailIsValid(email) || !passwordIsValid(password)) {
    return {
      error: true,
      message: 'deu ruim',
    };
  }
  const user = await service.getByEmail(email);
  if (!user) {
    return { error: true, message: 'user nao encontrado' };
  }
  if (user.password !== password) {
    return { error: true, message: 'senha invalida' };
  }
  return { error: false, user };
};

const generateToken = ({ name, email, role }) => {
  const secret = process.env.SECRET;
  const payload = {
    name,
    email,
    role,
  };

  return jwt.sign(payload, secret);
};

const login = async (userEmail, password) => {
  const { error, message, user } = await validateLogin(userEmail, password);
  if (error) return { error, message };
  const token = generateToken(user);

  const { email, name, role } = user;
  return { error: false, payload: { token, name, email, role } };
};

module.exports = { login };
