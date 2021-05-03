const  mysql = require('mysql2/promise');

const conn = mysql.createPool({
    host: process.env.HOSTNAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'Trybeer',
    port: '3306'
  });
  
  module.exports = connection;