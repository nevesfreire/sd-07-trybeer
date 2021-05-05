const connection = require('./connection');

const findUserByEmail = async (email) => {
  const [result] = await connection.execute('SELECT * FROM users WHERE email=?', [email]);
  return result;
};

const userRegistration = async (name, email, password, role) => {
  const [result] = await connection.execute(
    'INSERT INTO users(name, email, password, role) VALUE(?,?,?,?)', [name, email, password, role],
  );
  return result;
};

const userProfile = async (name, email) => {
  const [result] = await connection.execute(
    'UPDATE users SET name=? WHERE email=?', [name, email],
  );
  return result;
};

module.exports = {
  findUserByEmail,
  userRegistration,
  userProfile,
};
