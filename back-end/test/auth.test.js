const frisby = require('frisby');
const messages = require('../helpers/dictonary');

const url = 'http://localhost:3001';

describe('1 - Valida o endpoint para o login de usuários', () => {

  const users = [
    { name: 'Tryber Admin', email: 'tryber@trybe.com.br', password: '123456', role: 'administrator' },
    { name: 'testuser', email: 'user@test.com', password: 'test123', role: 'client'}
  ];

  it('Será validado que o campo "email" é obrigatório', async () => {
    await frisby
      .post(`${url}/login/`,
        {
          password: users[0].password,
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(messages.emailOrPasswordInvalid);
      });
  });

  it('Será validado que o campo "password" é obrigatório', async () => {
    await frisby
      .post(`${url}/login/`,
        {
          email: users[0].email,
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(messages.emailOrPasswordInvalid);
      });
  });

  it('Será validado que não é possível fazer login com um email inválido', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'emailInvalido',
          password: users[0].password,
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(messages.emailOrPasswordInvalid);
      });
  });

  it('Será validado que não é possível fazer login com uma senha inválida', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: users[0].email,
          password: users[0].password + 'Invalid',
        })
      .expect('status', 401)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(messages.emailOrPasswordInvalid);
      });
  });

  it('Será validado que é possível fazer login como admin com sucesso', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: users[0].email,
          password: users[0].password,
        })
      .expect('status', 200)
      .then((response) => {
        const { body, json } = response;
        const result = JSON.parse(body);
        expect(result.name).toBe(users[0].name);
        expect(result.email).toBe(users[0].email);
        expect(result.role).toBe(users[0].role);
        expect(json.token).not.toBeNull();
      });
  });

  it('Será validado que é possível fazer login como client com sucesso', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: users[1].email,
          password: users[1].password,
        })
      .expect('status', 200)
      .then((response) => {
        const { body, json } = response;
        const result = JSON.parse(body);
        expect(result.name).toBe(users[1].name);
        expect(result.email).toBe(users[1].email);
        expect(result.role).toBe(users[1].role);
        expect(json.token).not.toBeNull();
      });
  });
});
