const connection = require('./connection');

const loginUser = async (email) => {
  const query = 'SELECT * FROM Trybeer.users WHERE email = ?';
  const [users] = await connection.execute(query, [email])
  return users[0];

  
}

module.exports = {
  loginUser
}