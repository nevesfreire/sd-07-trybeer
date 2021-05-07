const { connection } = require('../config/conn');

const findByEmail = async (email) => {
  const [user] = await connection.execute(
    'SELECT id, name, email, role, password FROM users WHERE email=?',
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

const updateName = async (name, email) => {
  await connection.execute(
    'UPDATE users SET name=? WHERE email=?',
    [name, email],
  );
};

module.exports = {
  findByEmail,
  addUser,
  updateName,
};
