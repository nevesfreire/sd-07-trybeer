const conn = require('../../config/connect');

const getAll = async () => {
  const [users] = await conn.execute(
    'SELECT * FROM users;',
  );
  return users;
};

const getByEmail = async (email) => {
  const [[user]] = await conn.execute(
    'SELECT * FROM users WHERE users.email = ?;', [email],
  );
  return user;
};

module.exports = { getAll, getByEmail };
