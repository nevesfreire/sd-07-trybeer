const { connection } = require('../config/conn');

const findByEmail = async (email) => {
  const [user] = await connection.execute(
    'SELECT name, email, role FROM users WHERE email=?',
    [email],
  );
  if (user.length === 0) return false;
  return user;
};

const addUser = async (name, email, password, role) => {
  await connection.execute(
    'INSERT INTO users(name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role],
  );
};

module.exports = {
  findByEmail,
  addUser,
};
