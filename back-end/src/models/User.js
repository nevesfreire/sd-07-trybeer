const connection = require('./connection');
require('dotenv').config();

const updateUser = async (name, email) => {
  const [user] = await connection.execute(
    `UPDATE Trybeer.users SET users.name = '${name}' WHERE email = '${email}'`,
  );
  console.log(user) 
  return 'Atualização concluída com sucesso';
};

module.exports = {
  updateUser
};