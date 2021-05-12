require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.HOSTNAME || '127.0.0.1',
  user: process.env.MYSQL_USER || 'root', 
  password: process.env.MYSQL_PASSWORD || '12345',
  database: 'Trybeer',
});

module.exports = connection;
