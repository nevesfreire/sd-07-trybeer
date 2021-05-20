const frisby = require('frisby');
const jwt = require('jsonwebtoken');
const httpStatus = require('../helpers/httpStatus');
const user = require('./mocked/user');

const URL = 'http://localhost:3001';

const SECRET_PASS = process.env.SECRET_PASS || 'SECRET';

describe('[ login ] - deve validar email', () => {
  it('valida se o campo "email" é obrigatório', async () => {
    await frisby.post(`${URL}/api/token`, { password: '123456' })
      .expect('status', 400)
      .then((response) => {
        const result = JSON.parse(response.body);
        expect(result.message).toBe('O campo "email" é obrigatório.');
      });
  });

  it('valida se o campo "email" está no formato correto', async () => {
    await frisby.post(`${URL}/api/token`, { email: 'test@1', password: '123456' })
      .expect('status', httpStatus.BAD_REQUEST)
      .then((response) => {
        const result = JSON.parse(response.body);
        expect(result.message).toBe('O campo "email" deve ser válido.');
      });
  });
});

describe('[ login ] - deve validar password', () => {
  it('valida se o campo "password" é obrigatório', async () => {
    await frisby.post(`${URL}/api/token`, { email: 'test@test.com' })
      .expect('status', httpStatus.BAD_REQUEST)
      .then((response) => {
        const result = JSON.parse(response.body);
        expect(result.message).toBe('O campo "password" é obrigatório.');
      });
  });

  it('valida se o campo "password" está no formato correto', async () => {
    await frisby.post(`${URL}/api/token`, { email: 'test@test.com', password: '123' })
      .expect('status', httpStatus.BAD_REQUEST)
      .then((response) => {
        const result = JSON.parse(response.body);
        expect(result.message).toBe('O campo "password" deve ser válido.');
      });
  });
});

describe('[ login ] deve fazer login corretamente', () => {
  it('espera que o login será feito corretamente', async () => {
    await frisby.post(`${URL}/api/token`, {
      email: user.client.email,
      password: user.client.password,
    })
      .expect('status', httpStatus.OK)
      .then((response) => {
        const result = JSON.parse(response.body);
        const token = jwt.decode(result.token, SECRET_PASS);
        delete user.client.password;
        expect(token.data).toStrictEqual(user.client);
      });
  });
});