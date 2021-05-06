const conn = require('../database');

const create = async (name, email, password, role) => {
  const query = 'INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)';
  const values = [name, email, password, role];
  await conn.execute(query, values);
};

const findByEmail = async (email) => {
  const query = 'SELECT name, email, role FROM users WHERE email=?';
  const values = [email];
  const [user] = await conn.execute(query, values);
  console.log('model user', user);
  return user[0];
};

const findByEmailAndPassword = async (email, password) => {
  const query = 'SELECT name, email, role FROM users WHERE email=? AND password=?';
  const values = [email, password];
  const [user] = await conn.execute(query, values);
  return user[0];
};

module.exports = {
  create,
  findByEmail,
  findByEmailAndPassword,
};
