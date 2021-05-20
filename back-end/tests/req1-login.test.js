const frisby = require('frisby');

const URL = 'http://localhost:3001';

describe('1 - deve criar endpoint para o login de usuários', () => {
  it('valida se o campo "email" é obrigatório', async () => {
    await frisby.post(`${URL}/login`, {
      password: '123456',
    })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('O campo "email" é obrigatório.');
      });
  });
});
