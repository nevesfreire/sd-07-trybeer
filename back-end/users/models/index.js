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
  const query = 'SELECT * FROM Trybeer.users WHERE email = ?';
  const [data] = await conn.execute(query, [email]);
  return data[0];
};

module.exports = {
  getAll,
  getById,
  getByEmail,
};
