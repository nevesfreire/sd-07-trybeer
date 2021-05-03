const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.HOSTNAME,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'Trybeer',
});

module.exports = connection;
