const connection = require('../config/connection');

const getByEmail = async (email) => { 
  const [[user]] = await connection.execute('SELECT * FROM Trybeer.users WHERE email=?', [email]);
  return user;
};

const registerUser = async (name,email,password,role) =>
  connection()
    .then((db) =>
      db.collection('users').insertOne({name,email,password,role })).then((result) => result);
module.exports = {
  getByEmail,
  registerUser
};
