const frisby = require('frisby');
const httpStatus = require('../helpers/httpStatus');
const user = require('./mocked/user');

const URL = 'http://localhost:3001';

describe('[ login ] - deve validar email', () => {
  it('valida se o campo "email" é obrigatório', async () => {
    await frisby.post(`${URL}/login`, { password: '123456' })
      .expect('status', 400)
      .then((response) => {
        const result = JSON.parse(response.body);
        expect(result.message).toBe('O campo "email" é obrigatório.');
      });
  });

  it('valida se o campo "email" está no formato correto', async () => {
    await frisby.post(`${URL}/login`, { email: 'test@1', password: '123456' })
      .expect('status', httpStatus.BAD_REQUEST)
      .then((response) => {
        const result = JSON.parse(response.body);
        expect(result.message).toBe('O campo "email" deve ser válido.');
      });
  });
});

describe('[ login ] - deve validar password', () => {
  it('valida se o campo "password" é obrigatório', async () => {
    await frisby.post(`${URL}/login`, { email: 'test@test.com' })
      .expect('status', httpStatus.BAD_REQUEST)
      .then((response) => {
        const result = JSON.parse(response.body);
        expect(result.message).toBe('O campo "password" é obrigatório.');
      });
  });

  it('valida se o campo "password" está no formato correto', async () => {
    await frisby.post(`${URL}/login`, { email: 'test@test.com', password: '123' })
      .expect('status', httpStatus.BAD_REQUEST)
      .then((response) => {
        const result = JSON.parse(response.body);
        expect(result.message).toBe('O campo "password" deve ser válido.');
      });
  });
});

describe('[ login ] deve fazer login corretamente', () => {
  it('espera que o login será feito corretamente', async () => {
    await frisby.post(`${URL}/login`, { email: user.client.email, password: user.client.password })
      .expect('status', httpStatus.OK)
      .then((response) => {
        const result = JSON.parse(response.body);
        expect(result.name).toBe(user.client.name);
      });
  });
});