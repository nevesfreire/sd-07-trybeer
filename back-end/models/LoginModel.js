const connect = require('./connection');

const getUser = async () => 
  connect.execute('SELECT * FROM trybeer.users');

module.exports = {
  getUser,
};