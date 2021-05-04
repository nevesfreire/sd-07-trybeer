const connection = require('../config/connection');

const getAllUsers = async () => {
  const [allUsers] = await connection.execute('SELECT * FROM users');

  return allUsers;
};

const getUserByEmail = async (email) => {
  const [[user]] = await connection.execute(
    'SELECT * FROM users WHERE email =?',
    [email],
  );

  return user;
};

module.exports = { getUserByEmail, getAllUsers };
