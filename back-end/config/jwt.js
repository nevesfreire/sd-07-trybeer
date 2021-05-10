const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const SECRET = 'semideiaprasecret';

module.exports = {
  jwtConfig,
  SECRET,
};