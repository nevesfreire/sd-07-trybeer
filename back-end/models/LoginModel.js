const connect = require('./connection');

const getUser = async () => 
  connect.execute('SELECT * FROM Trybeer.users');

const getUserInfo = async ({ email, password }) => 
  connect.execute(
    `SELECT * FROM Trybeer.users
    WHERE email = "${email}" AND password = "${password}"`,
  ).catch((error) => console.log(error));

module.exports = {
  getUser,
  getUserInfo,
};