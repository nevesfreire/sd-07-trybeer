/*
const frisby = require('frisby');
const messages = require('../helpers/dictonary');
const { 
  deleteAndCreateDataBase,
  createTables, 
  closeConnection,
} = require('./clearDataBase');

const { user: { service } } = require('../resources');

describe('USER SERVICE TEST', () => {

  beforeAll(async () => await deleteAndCreateDataBase());

  beforeEach(async () => await createTables());

  afterAll(async () => await closeConnection());

  const users = [
    { name: 'Tryber Admin', email: 'tryber@trybe.com.br', password: '123456', role: 'administrator' },
    { name: 'testuser', email: 'user@test.com', password: 'test123', role: 'client'}
  ];

  it('Será validado que é possível listar todos os usuários', async () => {
    await service.getAll()
    .then((result) => {
      expect(result[0].id).toBe(1);
      expect(result[0].name).toBe(users[0].name);
      expect(result[0].email).toBe(users[0].email);
      expect(result[0].password).toBe(users[0].password);
      expect(result[0].role).toBe(users[0].role);
      expect(result[1].id).toBe(2);
      expect(result[1].name).toBe(users[1].name);
      expect(result[1].email).toBe(users[1].email);
      expect(result[1].password).toBe(users[1].password);
      expect(result[1].role).toBe(users[1].role);
      });
  });

  it('Será validado que é possível buscar um usuário por email', async () => {
    await service.getByEmail(users[0].email)
    .then((result) => {
      expect(result.id).toBe(1);
      expect(result.name).toBe(users[0].name);
      expect(result.email).toBe(users[0].email);
      expect(result.password).toBe(users[0].password);
      expect(result.role).toBe(users[0].role);
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
}); */
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
  /*
  it('Será validado que ao buscar um usuário por email inválido', async () => {
    await service.getByEmail('EmailInexistente')
    .then((result) => {
      expect(result).toBeUndefined();
    });
  });
});
*/
