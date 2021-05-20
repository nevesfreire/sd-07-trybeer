const frisby = require('frisby');

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
      .expect('status', 400)
      .then((response) => {
        const result = JSON.parse(response.body);
        expect(result.message).toBe('O campo "email" deve ser válido.');
      });
  });
});

describe('[ login ] - deve validar password', () => {
  it('valida se o campo "password" é obrigatório', async () => {
    await frisby.post(`${URL}/login`, { email: 'test@test.com' })
      .expect('status', 400)
      .then((response) => {
        const result = JSON.parse(response.body);
        expect(result.message).toBe('O campo "password" é obrigatório.');
      });
  });

  it('valida se o campo "password" está no formato correto', async () => {
    await frisby.post(`${URL}/login`, { email: 'test@test.com', password: '123' })
      .expect('status', 400)
      .then((response) => {
        const result = JSON.parse(response.body);
        expect(result.message).toBe('O campo "password" deve ser válido.');
      });
  });
});
