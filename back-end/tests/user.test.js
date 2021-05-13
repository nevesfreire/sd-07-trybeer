const request = require('supertest');
const express = require('express');
const { user } = require('../routes');
const connect = require('../models/connection');
const { generateToken } = require('./generateToken');

const app = express();
app.use(express.json());
app.use(user);

const contentType = 'Content-Type';
const applicationJson = 'application/json';
const tokenNew = generateToken();
const validToken = { authorization: tokenNew.token, applicationJson };

const validName = 'Joao Siqueira da Silva';
const validEmail = 'teste@teste.com';
const validPassword = '1234567';
const validRole = 'client';
const tryberAdmin = { 
  name: 'Tryber Admin', email: 'tryber@trybe.com.br', password: '123456', role: 'administrator' };
const newUser = {
  name: 'New User Test', email: 'new@user.com', password: '123456', role: 'administrator',
};

const nameRequired = { err: { message: '"name" is required' } };
const emailRequired = { err: { message: '"email" is required' } };
const passwordIsRequired = { err: { message: '"password" is required' } };
const roleIsRequired = { err: { message: '"role" is required' } };
const invalidNameLength = { err: { message: '"name" length must be at least 12 characters long' } };
const invalidEmailType = { err: { message: '"email" must be a valid email' } };
const invalidPasswordLength = { 
  err: { message: '"password" length must be at least 6 characters long' } };
const invalidRoleName = { err: { message: '"role" must be one of [client, administrator]' } };
const emailTaken = { err: { message: 'Já existe um usuário com esse e-mail.' } };

beforeAll(async () => connect.execute('DELETE FROM Trybeer.users WHERE email = \'new@user.com\''));

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

it('Não é possível cadastrar um com usuário o campo name contendo numeros ou simbulos', (done) => 
  request(app)
    .post('/user')
    .send({ name: 'Joao Amaral 1940', email: validEmail, password: validPassword, role: validRole })
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, /fails to match the required pattern/, done));

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

it('Não é possível cadastrar um email que já existe no banco', (done) => 
  request(app)
    .post('/user')
    .send(tryberAdmin)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, emailTaken, done));

it(' É possível cadastrar um novo usuario', (done) => 
  request(app)
    .post('/user')
    .send(newUser)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(201)
    .then(({ body }) => {
      const { token, name, email, role, id } = body;
      expect(body).toMatchObject({ token, name, email, role, id });
      done();
    }));

it('Não é possível atualizar o nome do usuario sem um token valido.', (done) => 
  request(app)
    .put('/user')
    .send({ name: 'Testando Novo Nome' })
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(401, /jwt must be provided/, done));
 
it('Deve ser possivel atualizar o nome do usuario.', (done) => 
  request(app)
    .put('/user')
    .send({ name: 'Testando Novo Usuario' })
    .set(validToken)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(200, done));

it('Caso seja o mesmo nome, o usuario não deve ser atualizado.', (done) => 
  request(app)
    .put('/user')
    .send({ name: 'Testando Novo Usuario' })
    .set(validToken)
    .set('Accept', applicationJson)
    .expect(304, done));

it('O nome do usuario não pode conter numeros ou caracteres especiais.', (done) => 
  request(app)
    .put('/user')
    .send({ name: 'Testando Novo 1' })
    .set(validToken)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(400, /fails to match the required pattern/, done));

afterAll(async () => {
  await connect.execute('UPDATE Trybeer.users SET name = "testuser" WHERE email = "user@test.com"');
  return connect.end();
});