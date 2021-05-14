const frisby = require('frisby');

const {
  // ReasonPhrases,
  StatusCodes,
  // getReasonPhrase,
  // getStatusCode,
} = require('http-status-codes');
const {
  createTableUsers,
  deleteTableUsers,
  insertUsers,
  autoIncrementTableUsers,
} = require('../utils/testsSupport');

const url = 'http://localhost:3001';

describe('1 - Teste no endpoint de login com usuário inexistente', () => {
  beforeEach(() => { createTableUsers(); });
  afterEach(() => { deleteTableUsers(); autoIncrementTableUsers(); });
  it('Verifica se é possível fazer login com usuário inexistente', async () => {
    insertUsers();
    await frisby
      .post(`${url}/user/login`,
        {
          email: 'fulano@mail.com',
          password: '123456',
        })
      .expect('status', StatusCodes.NOT_FOUND)
      .then((response) => {
        const { body } = response;
        console.log('body teste 1', body);
        const result = JSON.parse(body);
        expect(result.message).toBe('usuário ou senha incorreto');
      });
  });
});

describe('2 - Teste no endpoint de login com senha de usuário incorreta', () => {
  beforeEach(() => { createTableUsers(); });
  afterEach(() => { deleteTableUsers(); autoIncrementTableUsers(); });
  it('Verifica se é possível fazer login com senha de usuário incorreta', async () => {
    insertUsers();
    await frisby
      .post(`${url}/user/login`,
        {
          email: 'tryber@trybe.com.br',
          password: 'senha123456',
        })
      .expect('status', StatusCodes.NOT_FOUND)
      .then((response) => {
        const { body } = response;
        console.log('body teste 2', body);
        const result = JSON.parse(body);
        expect(result.message).toBe('usuário ou senha incorreto');
      });
  });
});

describe('3 - Teste no endpoint de login com usuário existente e senha correta', () => {
  beforeEach(() => { createTableUsers(); });
  afterEach(() => { deleteTableUsers(); autoIncrementTableUsers(); });
  it('Verifica se é possível fazer login com usuário existente e senha correta', async () => {
    insertUsers();
    await frisby
      .post(`${url}/user/login`,
        {
          email: 'tryber@trybe.com.br',
          password: '123456',
        })
      .expect('status', StatusCodes.OK)
      .then((response) => {
        const { body } = response;
        console.log('body teste 3', body);
        const result = JSON.parse(body);
        console.log('result', result);
      });
  });
});