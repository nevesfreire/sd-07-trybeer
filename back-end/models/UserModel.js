const connection = require('./connection');

const getByEmail = async (email) => { 
  const [[user]] = await connection.execute('SELECT * FROM Trybeer.users WHERE email=?', [email]);
  return user;
};

const registerUser = async (name, email, password, role) => connection.execute(
  'INSERT INTO Trybeer.users(name, email, password, role) VALUES (?,?,?,?)',
  [name, email, password, role],
);

const updateUserName = async (name, email) => {
  const result = await connection.execute(
    'UPDATE Trybeer.users SET name = ? WHERE email = ?', [name, email],
  );
  return result;
};

module.exports = {
  getByEmail,
  registerUser,
  updateUserName,
};
