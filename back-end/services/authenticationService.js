const jwt = require('jsonwebtoken');
const userService = require('./userService');

const SECRET_PASS = process.env.SECRET_PASS || 'SECRET';

const jwtConfig = {
  expiresIn: 60 * 60,
  algorithm: 'HS256',
};

module.exports = {
  async getToken(credentials) {
    const user = await userService.get(credentials);
    return jwt.sign({ data: user }, SECRET_PASS, jwtConfig);
  },
};
