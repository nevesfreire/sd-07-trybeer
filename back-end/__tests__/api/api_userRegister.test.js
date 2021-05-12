require('dotenv').config();
const mysql = require('mysql2/promise');
const frisby = require('frisby');

const connection = mysql.createPool({
  host: process.env.HOSTNAME || '127.0.0.1',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '12345',
  database: 'Trybeer',
});

// eslint-disable-next-line max-lines-per-function
describe('Check register POST route', () => {
  const USERS = [{
    name: 'Pedro Risso',
    email: 'prisso@gmail.com',
    password: '1234567',
    role: 'administrator',
  }, {
    name: 'Risso',
    email: 'risso@domain.com',
    password: '123test',
    role: 'client',
  }];

  const sectret = process.env.SECRET || '12345';

  const URL = 'http://localhost:3001/login';

  beforeEach(async (done) => {
    await connection.execute('DELETE FROM users');
    done();
  });

  it('Check user registration', async () => {
    await frisby
      .post(URL, {
        email: USERS[0].email,
        password: USERS[0].password,
      })
      .expect()
  })
});