const request = require('supertest');
const app = require('../server');
const connection = require('../models/connection');

// import createAndInsertsDataBase from '../actions/actionBase';
// import dropAndTruncateDataBase from '../actions/actionBase';

// beforeAll (async () => {
  // await connection.execute('DELETE FROM Trybeer.sales_products');
  // await connection.execute('ALTER TABLE Trybeer.sales_products AUTO_INCREMENT = 1');
  // await connection.execute('DELETE FROM Trybeer.sales');
  // await connection.execute('ALTER TABLE Trybeer.sales AUTO_INCREMENT = 1');
  // await connection.execute('DELETE FROM Trybeer.products');
  // await connection.execute('ALTER TABLE Trybeer.products AUTO_INCREMENT = 1');
  // await connection.execute('DELETE FROM Trybeer.users');
  // await connection.execute('ALTER TABLE Trybeer.users AUTO_INCREMENT = 1');
//   dropAndTruncateDataBase()
  
// });

describe('test for successful login route', () => {
  it('Should login, with user registered in the database', async (done) => {
    const OK = 200;
    const res = await request(app).post('/login').send({
        email: 'user@test.com',
        password: 'test123',
      });
    expect(res.statusCode).toBe(OK);
    expect(res.body).toHaveProperty('token');
    done();
  });
});

describe('Test for failed login route', () => {
  it('Should return error, if user is not registered in the database',
  async (done) => {
    const ERROR = 401;
    const res = await request(app)
      .post('/login')
      .send({
        email: 'user@test',
        password: 'test123',
      });
    expect(res.statusCode).toBe(ERROR);
    expect(res.body).toHaveProperty('message');
    connection.end();
    done();
  });
});
