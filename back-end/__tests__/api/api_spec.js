const frisby = require('frisby');
const connection = require('./connection');

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
  beforeEach(async () => {
    const insertionRes = USERS.map((user) => {
      const { name, email, password, role } = user;
      connection.execute('INSERT INTO users (name, email, password, role) ' 
      + 'VALUES (?, ?, ?, ?)', [name, email, password, role]);
    });
    Promise
  });
  it('Check if post route is available', async () => {
    await frisby
      .post('http://localhost:3001/login', {
        email: USERS[1].email,
        password: USERS[1].password,
      })
      .expect('status', 200);
  });
});
