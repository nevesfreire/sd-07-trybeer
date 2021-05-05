const connection = require('../config/connection');

const findByEmail = async (email) => {
  const [[user]] = await connection.execute('SELECT * FROM users WHERE email=?', [email]);
  return user;
};

module.exports = {
  findByEmail,
};
