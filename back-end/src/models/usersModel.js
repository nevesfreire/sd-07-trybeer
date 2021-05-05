const connection = require('../config/connection');

const getAllUsers = async () => {
  const [allUsers] = await connection.execute('SELECT * FROM users');

  return allUsers;
};

const getUserByEmail = async (email) => {
  const [
    [user],
  ] = await connection.execute('SELECT * FROM users WHERE email =?', [email]);

  return user;
};

const createUser = async (name, email, password, role) => {
  await connection.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, password, role],
  );
  return { name, email, role };
};

module.exports = { getUserByEmail, getAllUsers, createUser };
