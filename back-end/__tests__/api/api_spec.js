require('dotenv').config();
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const frisby = require('frisby');

const connection = mysql.createPool({
  // eslint-disable-next-line no-irregular-whitespace
  host: process.env.HOSTNAME || '127.0.0.1',
  user: process.env.MYSQL_USER || 'root', 
  password: process.env.MYSQL_PASSWORD || '12345',
  database: 'Trybeer',
});

module.exports = connection;

// eslint-disable-next-line max-lines-per-function
describe('POST into login route', () => {
  const USERS = [{
    name: 'Pedro Risso',
    email: 'prisso@gmail.com',
    password: '1234567',
    role: 'administrator' },
  { name: 'Risso',
    email: 'risso@domain.com',
    password: '123456test',
    role: 'client' },
  ];

  const secret = process.env.SECRET || '12345';

  const URL = 'http://localhost:3001/login';

  beforeEach(async (done) => {
    await connection.execute('INSERT INTO users (name, email, password, role) ' 
      + 'VALUES (?, ?, ?, ?), (?, ?, ?, ?)',
      [USERS[0].name, USERS[0].email, USERS[0].password, USERS[0].role,
      USERS[1].name, USERS[1].email, USERS[1].password, USERS[1].role]);
    done();
  });

  afterEach(async (done) => {
    await connection.execute('DELETE FROM users');
    done();
  });
  it('Check if client login route is a POST, is available and working', async () => {
    await frisby
      .post(URL, {
        email: USERS[1].email,
        password: USERS[1].password,
      })
      .expect('status', 200);
  });
  it('Check if administrator login route is a POST, is available and working', async () => {
    await frisby
      .post(URL, {
        email: USERS[0].email,
        password: USERS[0].password,
      })
      .expect('status', 200);
  });
  it('Check how login route handle an empty password', async () => {
    await frisby
      .post(URL, {
        email: USERS[0].email,
        password: '',
      })
      .expect('status', 400);
  });
  it('Check how login route handle an empty email', async () => {
    await frisby
      .post(URL, {
        email: '',
        password: 'somePassword',
      })
      .expect('status', 400);
  });
  it('Check how login route handle a missing password field', async () => {
    await frisby
      .post(URL, {
        password: 'somePass',
      })
      .expect('status', 400);
  });
  it('Check how login route handle a missing email field', async () => {
    await frisby
      .post(URL, {
        email: 'user@domain.com',
      })
      .expect('status', 400);
  });
  it('Check the return of a jwt formed with id and user role returned when login-in', async () => {
    await frisby
      .post(URL, {
        email: USERS[1].email,
        password: USERS[1].password,
      })
      .expect('status', 200)
      .then((resp) => {
        const { body } = resp;
        const parsedBody = JSON.parse(body);
        expect(Object.keys(jwt.verify(parsedBody.message.token, secret))).toContain('id', 'role');
      });
  });
});
