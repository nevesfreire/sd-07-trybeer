const connection = require('./connection');
require('dotenv').config();

const updateUser = async (name, oldName) => {
  const [user] = await connection.execute(
    `UPDATE Trybeer.users SET users.name = '${name}' WHERE name = '${oldName}'`,
  );
  console.log(user) 
  return 'update Sucess';
};

module.exports = {
  updateUser
};