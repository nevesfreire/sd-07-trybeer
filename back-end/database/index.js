const mysql = require('mysql2/promise');

const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  database: 'Trybeer',
};

const { user, password, host, database } = config;
const conn = mysql.createPool({
  host,
  user,
  password,
  database,
});

module.exports = conn;
