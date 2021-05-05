// const { INSERT } = require('sequelize/types/lib/query-types');
const connection = require('./connection');

const getByEmail = async (email) => { 
  const [[user]] = await connection.execute('SELECT * FROM Trybeer.users WHERE email=?', [email]);
  return user;
};

const registerUser = async (name, email, password, role) => {
  await connection
    .execute('INSERT INTO Trybeer.users (name, email, password, role) VALUES (?,?,?,?)',
    [name, email, password, role]);
};
  
module.exports = {
  getByEmail,
  registerUser,
};
