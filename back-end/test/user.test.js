const frisby = require('frisby');
const messages = require('../helpers/dictonary');
const { 
  deleteAndCreateDataBase,
  createTables, 
  closeConnection,
} = require('./clearDataBase');


const url = 'http://localhost:3001';

describe('2 - Valida o endpoint para o registro de usuários', () => {

  beforeAll(async () => await deleteAndCreateDataBase());

  beforeEach(async () => await createTables());

  afterAll(async () => await closeConnection());

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

  it('Será validado que não é possível cadastar uma senha inválida', async () => {
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
/*
describe('4 - Crie um endpoint para a edição de usuários', () => {

  beforeAll(async () => await deleteAndCreateDataBase());

  beforeEach(async () => await createTables());

  afterAll(async () => await closeConnection());
  
  const users = [
    { name: 'Joaquim Jose da Silva', email: 'joaquim@gmail.com', password: '123456', role: 'client' },
  ];    

  it.only('Será validado que não é possível alterar usuário com email inválido', async () => {
    await frisby
      .post(`${url}/register`, {
        name: users[0].name,
        email: users[0].email,
        password: users[0].password,
        role: users[0].role,
      })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);        
      })      
      .post(`${url}/login/`, {
        email: users[0].email,
        password: users[0].password,
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        return frisby
          .setup({
            request: {
              headers: {
                Authorization: result.token,
                'Content-Type': 'application/json',
              },
            },
          });
      });
    await frisby
    .setup({
      request: {
        headers: {
          Authorization: result.token,
          'Content-Type': 'application/json',
        },
      },
    })
    .put(`${url}/${pathProfile}`, {
      email: 'joaquim.com',
      name: 'Joaquim Silva Jose',        
    })
    .expect('status', 401)
    .then((response) => {
      const { body } = response;
      const result = JSON.parse(body);
      expect(result.message).toBe(messages.invalidData);
    }); 
  });*/
});
