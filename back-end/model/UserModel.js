const connection = require('./connection');

const create = async (name, email, role, password) => {
  try {
    const newUser = await connection.execute(
      'INSERT INTO users (name, email, role, password) VALUES (?,?,?,?)',
      [name, email, role, password],
    );
      return { id: newUser[0].insertId, name, email, role, password };
  } catch (e) { return e; }
  };

module.exports = { create };