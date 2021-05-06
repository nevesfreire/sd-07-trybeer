const connection = require('./connection');

const noAffectRow = 0;

const loginUser = async (email) => {
  const query = 'SELECT * FROM Trybeer.users WHERE email = ?';
  const [users] = await connection.execute(query, [email]);
  return users[0];
};
const registerUser = async (name, email, password, role) => {
  const query = 'INSERT INTO Trybeer.users(name, email, password, role) values(?, ?, ?, ?)';
  await connection.execute(query, [name, email, password, role]);
};

const profileNameUpdate = async (name, email) => {
  const query = 'UPDATE Trybeer.users SET name = ? WHERE email = ?';
  const [users] = await connection.execute(query, [name, email]);
  if (users.affectedRows === noAffectRow) return false;
  return true;
};

module.exports = {
  loginUser,
  profileNameUpdate,
  registerUser,
};