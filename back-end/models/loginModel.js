const connection = require('./connection');

const getByEmail = async (email) => {
  const [row] = await connection.execute('SELECT * FROM users WHERE email = ?', [
    email,
  ]);
  return row;
};

module.exports = {
  getByEmail,
};