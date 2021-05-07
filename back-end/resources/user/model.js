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

const create = async (name, email, password, role) => conn.execute(
  `INSERT INTO users (name, email, password, role) VALUES
    (?, ?, ?, ?)`, [name, email, password, role],
);

module.exports = { getAll, getByEmail, create };
