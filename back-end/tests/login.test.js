const request = require('supertest');
const express = require('express');
const connect = require('../models/connection');

const { login } = require('../routes');

const app = express();
app.use(express.json());
app.use(login);

const invalidEmail = { email: 'test@test', password: '1234567' };
const emptyEmail = { email: '', password: '1234567' };
const emptyPassword = { email: 'test@teste.com', password: '' };
const passwordOnly = { password: '123456' };
const emailOnly = { email: 'tste@teste.com' };
const shortPassword = { email: 'tete@teste.com', password: '12345' };
const invalidUser = { email: 'invaliduser@invalid.com', password: 'invalidPassword' };
const validUser = { email: 'tryber@trybe.com.br', password: '123456' };

const emailMustBeValid = { err: { message: '"email" must be a valid email' } };
const notAllowedEmptyEmail = { err: { message: '"email" is not allowed to be empty' } };
const notAllowedEmptyPassword = { err: { message: '"password" is not allowed to be empty' } };
const emailIsRequired = { err: { message: '"email" is required' } };
const passwordIsRequired = { err: { message: '"password" is required' } };
const wrongPasswordLength = { 
  err: { message: '"password" length must be at least 6 characters long' },
};
const userNotRegistered = { err: { message: 'Usuário inválido' } };

const contentType = 'Content-Type';
const applicationJson = 'application/json';

it('Não é possível fazer login com um email inválido', (done) => request(app)
    .post('/login')
    .send(invalidEmail)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, emailMustBeValid, done));

it('Não é possível fazer login com um email em branco.', (done) => request(app)
    .post('/login')
    .send(emptyEmail)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, notAllowedEmptyEmail, done));

it('Não é possível fazer login com uma senha em branco.', (done) => request(app)
    .post('/login')
    .send(emptyPassword)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, notAllowedEmptyPassword, done));

it('Não é possível fazer login sem passar um email.', (done) => request(app)
    .post('/login')
    .send(passwordOnly)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, emailIsRequired, done));

it('Não é possível fazer login sem passar uma senha.', (done) => request(app)
    .post('/login')
    .send(emailOnly)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, passwordIsRequired, done));

it('Não é possível fazer login com uma senha menor que 6 caracteres.', (done) => request(app)
    .post('/login')
    .send(shortPassword)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, wrongPasswordLength, done));

it('Não é possível fazer login com um usuário não cadastrado.', (done) => request(app)
    .post('/login')
    .send(invalidUser)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, userNotRegistered, done));

it('Ao realizar login com sucesso deve ser retornado um objeto com token, name, email, role, id.',
  (done) => request(app)
    .post('/login')
    .send(validUser)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(200)
    .then(({ body }) => {
      const { token, name, email, role, id } = body;
      expect(body).toMatchObject({ token, name, email, role, id });
      done();
    }));

afterAll(async () => connect.end());