const conn = require('../../models/connection');

const getAll = async () => {
  const query = 'SELECT * FROM users;';
  const [data] = await conn.execute(query);
  return data;
};

const getById = async (id) => {
  const query = 'SELECT * FROM Trybeer.users WHERE id = ?';
  const [data] = await conn.execute(query, [id]);
  return data[0];
};

const getByEmail = async (email) => {
  console.log(email, 'modelGetByEmail');
  const query = 'SELECT * FROM Trybeer.users WHERE email = ?';
  const [data] = await conn.execute(query, [email]);
  // console.log(data, 'dataModel');
  return data[0];
};

const createUser = async (name, email, password, role) => {
  const query = 'INSERT INTO users(name, email, password, role) '
  + 'VALUES (?, ?, ?, ?)';
  console.log(name, email, password, role, 'dataModelCreateUser');
  const [data] = await conn.execute(query, [name, email, password, role]);
  return data;
};

const alterByEmail = async (name, email) => {
  const query = 'UPDATE users SET name = ? WHERE email = ?';
  const [data] = await conn.execute(query, [name, email]);
  console.log('dataModel', data);
  return data;
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  createUser,
  alterByEmail,
};
