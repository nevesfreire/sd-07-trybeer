const request = require('supertest');
const express = require('express');

const { user } = require('../routes');

const app = express();
app.use(express.json());
app.use(user);

const contentType = 'Content-Type';
const applicationJson = 'application/json';

const validName = 'Joao Siqueira da Silva';
const validEmail = 'teste@teste.com';
const validPassword = '1234567';
const validRole = 'client';

const nameRequired = { err: { message: '"name" is required' } };
const emailRequired = { err: { message: '"email" is required' } };
const passwordIsRequired = { err: { message: '"password" is required' } };
const roleIsRequired = { err: { message: '"role" is required' } };
const invalidNameLength = { err: { message: '"name" length must be at least 12 characters long' } };
const invalidEmailType = { err: { message: '"email" must be a valid email' } };
const invalidPasswordLength = { 
  err: { message: '"password" length must be at least 6 characters long' } };
const invalidRoleName = { err: { message: '"role" must be one of [client, administrator]' } };

it('Não é possível cadastrar um usuário sem o campo name', (done) => request(app)
    .post('/user')
    .send({})
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, nameRequired, done));
  
it('Não é possível cadastrar um usuário sem o campo email', (done) => request(app)
  .post('/user')
  .send({ name: validName })
  .set('Accept', applicationJson)
  .expect(contentType, /json/)
  .expect(400, emailRequired, done));

it('Não é possível cadastrar um usuário sem o campo password', (done) => request(app)
  .post('/user')
  .send({ name: validName, email: validEmail })
  .set('Accept', applicationJson)
  .expect(contentType, /json/)
  .expect(400, passwordIsRequired, done));

it('Não é possível cadastrar um usuário sem o campo role', (done) => request(app)
  .post('/user')
  .send({ name: validName, email: validEmail, password: validPassword })
  .set('Accept', applicationJson)
  .expect(contentType, /json/)
  .expect(400, roleIsRequired, done));

it('Não é possível cadastrar um com usuário o campo name menor que 12 caracteres', (done) => 
  request(app)
    .post('/user')
    .send({ name: 'Joao', email: validEmail, password: validPassword, role: validRole })
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, invalidNameLength, done));

it('Não é possível cadastrar um usuário com o campo email inválido', (done) => request(app)
  .post('/user')
  .send({ name: validName, email: 'teste@teste', password: validPassword, role: validRole })
  .set('Accept', applicationJson)
  .expect(contentType, /json/)
  .expect(400, invalidEmailType, done));

it('Não é possível cadastrar um usuário com uma senha menor que 6 caracteres', (done) => 
  request(app)
    .post('/user')
    .send({ name: validName, email: validEmail, password: '1234', role: validRole })
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, invalidPasswordLength, done));

it('Não é possível cadastrar um usuário que a role não seja administrator ou client', (done) => 
  request(app)
    .post('/user')
    .send({ name: validName, email: validEmail, password: validPassword, role: 'outro' })
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, invalidRoleName, done));