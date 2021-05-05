const connection = require('./connection');

const loginUser = async (email) => {
  const query = 'SELECT * FROM Trybeer.users WHERE email = ?';
  const [users] = await connection.execute(query, [email]);
  return users[0];
};
const registerUser = async (name, email, password, role) => {
  const query = 'INSERT INTO Trybeer.users(name, email, password, role) values(?, ?, ?, ?)';
  await connection.execute(query, [name, email, password, role]);
};

module.exports = {
  loginUser,
  registerUser,
};