const frisby = require('frisby');
const messages = require('../helpers/dictonary');

const url = 'http://localhost:3001';

describe('2 - Valida o endpoint para o registro de usuários', () => {

  const users = [
    { name: 'Fulado de Tal', email: 'fulanobeltrano@gmail.com', password: '123456', role: 'administrator' },
  ];

  it('Será validado que o campo "email" é obrigatório', async () => {
    await frisby
      .post(`${url}/register/`,
        {
          password: users[0].password,
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(messages.invalidData);
      });
  });

  it('Será validado que o campo "password" é obrigatório', async () => {
    await frisby
      .post(`${url}/register/`,
        {
          email: users[0].email,
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(messages.invalidData);
      });
  });

  it('Será validado que não é possível cadastrar um email inválido', async () => {
    await frisby
      .post(`${url}/register`,
        {
          email: 'emailInvalido',
          password: users[0].password,
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(messages.invalidData);
      });
  });

  it('Será validado que não é possível cadatar uma senha inválida', async () => {
    await frisby
      .post(`${url}/register`,
        {
          email: users[0].email,
          password: users[0].password + 'Invalid',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(messages.invalidData);
      });
  });

  it('Será validado que é possível cadastrar um usuario admin com sucesso', async () => {
    await frisby
      .post(`${url}/register`,
        {
          name: users[0].name,
          email: users[0].email,
          password: users[0].password,
          role: users[0].role,
        })
      .expect('status', 201)
      .then((response) => {
        const { body, json } = response;
        const result = JSON.parse(body);
        expect(result.name).toBe(users[0].name);
        expect(result.email).toBe(users[0].email);
        expect(result.password).toBe(users[0].password);
        expect(result.role).toBe(users[0].role);
      });
  });  
});