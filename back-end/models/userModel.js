const connection = require('./connection');

const getByEmail = async (email) => {
  const [row] = await connection.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return row;
};

const create = async (name, email, password) => {
  const role = 'client';
  const [
    row,
  ] = await connection.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)',
    [name, email, password, role]
  );
  return { id: row.insertId, name, email, password, role };
};

const createAdmin = async (name, email, password) => {
  const role = 'admin';
  const [
    row,
  ] = await connection.execute(
    'INSERT INTO users (name, email, password, role) VALUES(?,?,?,?)',
    [name, email, password, role]
  );
  return { id: row.insertId, name, email, password, role };
};

module.exports = {
  getByEmail,
  create,
  createAdmin,
};
