const connection = require('./connection');

const getUsers = async () => {
  const [users] = await connection.execute('SELECT * FROM users');
  return users;
};

const getProductsById = async (id) => {
  const [[user]] = await connection.execute('SELECT * FROM users WHERE id=?', [id]);
  return user;
};

const getUserByEmail = async (email) => {
  const [[user]] = await connection.execute('SELECT * FROM users WHERE email=?', [email]);
  console.log('Console do getUserByEmail', user);
  return user;
};

const createUser = async (data) => {
  console.log('model', data);
  const { name, email, password, role } = data;
  const [result] = await connection.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)', 
  [name, email, password, role],
);
  console.log('create user model', result);
  return result;
};

module.exports = {
  getUsers,
  getProductsById,
  getUserByEmail,
  createUser,
};