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

const findByEmail = async (email) => {
  console.log(email);
  console.log('------------------------------------');
  try {
    const user = await connection.execute(
      'SELECT * FROM users WHERE email = ?', [email],
    );
    return user[0][0];
  } catch (e) { return e; }
};
module.exports = { create, findByEmail };