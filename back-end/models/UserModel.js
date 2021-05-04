const connection = require('../config/connection');

const getByEmail = async (email) => { 
  const [[user]] = await connection.execute('SELECT * FROM Trybeer.users WHERE email=?', [email]);
  return user;
};

module.exports = {
  getByEmail,
};
