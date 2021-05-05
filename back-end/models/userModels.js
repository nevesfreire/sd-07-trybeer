const connection = require('./connection');

const findUserByEmail = async (email) => {
  const [result] = await connection.execute('SELECT * FROM users WHERE email=?', [email]);
  return result;
};

const userRegistration = () => {
  console.log('asdasd');
  return 'deu bom no model';
};

module.exports = {
  findUserByEmail,
  userRegistration,
};
