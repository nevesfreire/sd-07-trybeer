const conn = require('../database');

const findByEmailAndPassword = async (email, password) => {
  const query = 'SELECT name, email, role FROM users WHERE email=? AND password=?';
  const values = [email, password];
  const [user] = await conn.execute(query, values);
  return user[0];
};

module.exports = {
  findByEmailAndPassword,
};
