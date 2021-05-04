const connection = require('../connection');

const getUserByEmail = async (email) => {
  const [[user]] = await connection.execute('SELECT (id, password, role) FROM users WHERE email=?',
    [email]);
  return user;
};

module.exports = getUserByEmail;