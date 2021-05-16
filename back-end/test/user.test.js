const request = require('supertest');
const app = require('../server');
const connection = require('../models/connection');

describe('Test for user registration route with client profile', () => {  
  it('should allow registering a user with a client profile', async (done) => {
    const CREATE = 201;
    const objectUser = {"user": {
      "email": "lorem@teste.com",
      "id": 3,
      "name": "Lorem Ips da Silva",
      "password": "lorem123",
      "role": "client"}};
    const res = await request(app)
      .post('/user')
      .send({
        name:  'Lorem Ips da Silva',
        email: 'lorem@teste.com',
        password: 'lorem123',
        iWantToSell: false
      });
    expect(res.statusCode).toBe(CREATE);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toEqual(objectUser);
    done();
  });
  it('Must not allow registering user with email already registered', async (done) => {
    const CONFLICT = 409;
    const objMsg = { message: 'Email already registered' };
    const res = await request(app)
      .post('/user')
      .send({
        name:  'Lorem Ips da Silva',
        email: 'lorem@teste.com',
        password: 'lorem123',
        iWantToSell: false
      });
    expect(res.statusCode).toBe(CONFLICT);
    expect(res.body).toEqual(objMsg);
    done();
  });
  it('Must not allow entering a name less than 12 characters', async (done) => {
    const ERROR = 400;
    const objError = { message: 'Invalid entries. Try again.' };
    const res = await request(app)
      .post('/user')
      .send({
        name:  'Lor',
        email: 'lorem3@teste.com',
        password: 'lorem123',
        iWantToSell: false
      });
    expect(res.statusCode).toBe(ERROR);
    expect(res.body).toEqual(objError);
    done();
  });
  it('You must not allow registration without informing the name', async (done) => {
    const ERROR = 400;
    const objError = { message: 'Invalid entries. Try again.' };
    const res = await request(app)
      .post('/user')
      .send({
        email: 'lorem3@teste.com',
        password: 'lorem123',
        iWantToSell: false
      });
    expect(res.statusCode).toBe(ERROR);
    expect(res.body).toEqual(objError);
    done();
  });
  it('Must not allow inserting invalid email', async (done) => {
    const ERROR = 400;
    const objError = { message: 'Invalid entries. Try again.' };
    const res = await request(app)
      .post('/user')
      .send({
        name:  'Lorem ips da Silva3',
        email: 'lorem34',
        password: 'lorem123',
        iWantToSell: false
      });
    expect(res.statusCode).toBe(ERROR);
    expect(res.body).toEqual(objError);
    done();
  });
  it('Should not allow inserting user without email', async (done) => {
    const ERROR = 400;
    const objError = { message: 'Invalid entries. Try again.' };
    const res = await request(app)
      .post('/user')
      .send({
        name:  'Lorem ips da Silva3',
        password: 'lorem123',
        iWantToSell: false
      });
    expect(res.statusCode).toBe(ERROR);
    expect(res.body).toEqual(objError);
    done();
  });
  it('Must not allow user without password', async (done) => {
    const ERROR = 400;
    const objError =   { message: 'Invalid entries. Try again.' };
    const res = await request(app)
      .post('/user')
      .send({
        name:  'Lorem Ips da Silva 100',
        email: 'lorem100@teste.com',
        iWantToSell: false
      });
    expect(res.statusCode).toBe(ERROR);
    expect(res.body).toEqual(objError);
    done();
  });
  it('Must not allow user with password less than 6 characters', async (done) => {
    const ERROR = 400;
    const objError = { message: 'Invalid entries. Try again.' };
    const res = await request(app)
      .post('/user')
      .send({
        name:  'Lorem Ips da Silva 100',
        email: 'lorem100@teste.com',
        password: 'lor',
        iWantToSell: false
      });
    expect(res.statusCode).toBe(ERROR);
    expect(res.body).toEqual(objError);
    done();
  });  
});

describe('Test for user registration route with Administrator profile', () => {
  it('Must register user with Administrator profile', async (done) => {
    const CREATE = 201;
    const objectUserAdmin = {"user": {
      "email": "loremAdmin@teste.com",
      "id": 4,
      "name": "Lorem Admin Ips da Silva",
      "password": "lorem123",
      "role": "admin"}};
    const res = await request(app)
      .post('/user')
      .send({
        name:  'Lorem Admin Ips da Silva',
        email: 'loremAdmin@teste.com',
        password: 'lorem123',
        iWantToSell: true
      });
    expect(res.statusCode).toBe(CREATE);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toEqual(objectUserAdmin);
    done();
  });
  it('Must not allow registration without form information', async (done) => {
    const ERROR = 400;
    const objError = { message: 'Invalid entries. Try again.' };
    const res = await request(app)
      .post('/user');
    expect(res.statusCode).toBe(ERROR);
    expect(res.body).toEqual(objError);
    connection.end();
    done();
  });
});

// describe('Teste rota para atualizar o nome do usuario', () => {
//   const OK = 200;
//   const ERRORUPDATE = 204;
//   const ERROR = 401;
  
//   it('Deve retornar erro, caso usuario não esteja logado', async (done) => {
//     const objError = { message: 'missing auth token' };
//     const res = await request(app)
//       .put('/user/:id')
//     expect(res.statusCode).toBe(ERROR);
//     expect(res.body).toEqual(objError);
//     connection.end();
//     done();
//   });

//   // it('Deve atualizar o nome do usuario', async (done) => {

//   //   // { name: 'testuser',
//   //   //     email: 'user@test.com',
//   //   //     token:
//   //   //      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdGVzdC5jb20iLCJyb2xlIjoiY2xpZW50IiwiaWQiOjIsImlhdCI6MTYyMTE2ODQzMCwiZXhwIjoxNjIxMTcyMDMwfQ.x3h36xYnR3oELHwvTs1FmlQ2SuJRWVCxDGAOiHirnBU',
//   //   //     role: 'client',
//   //   //     id: 2 }

//   //   const res = await request(app).post('/login').send({
//   //     email: 'user@test.com',
//   //     password: 'test123',
//   //   });

//   //   const res1 = await request(app).put(`/user/${2}`)
//   //     .send({
//   //       name: 'Alterando o nome do user',
//   //       email: 'user@test.com'
//   //     })
//   //     .set(res.token);
  
//   //   expect(res1.statusCode).toBe(OK);
//   //   connection.end();
//   //   done();
//   // });
// })