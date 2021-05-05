const connection = require('../connection');

const getUserByEmail = async (email) => {
  const conn = await connection;
  const [[user]] = await conn.execute('SELECT id, name, password, role FROM users WHERE email=?',
    [email]);
  return user;
};

module.exports = getUserByEmail;