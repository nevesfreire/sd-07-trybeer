const connect = require('./connection');

const getUser = async () => 
  connect.execute('SELECT * FROM trybeer.users');

const getUserInfo = async ({ email, password }) => 
  connect.execute(
    `SELECT * FROM trybeer.users
    WHERE email = "${email}" AND password = "${password}"`,
  ).catch((error) => console.log(error));
 
module.exports = {
  getUser,
  getUserInfo,
};