const frisby = require('frisby');

const {
  createTableUsers,
  deleteTableUsers,
  insertUsers,
  autoIncrementTableUsers,
} = require('../utils/testsSupport')

const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} =  require('http-status-codes');

const url = 'http://localhost:3001';

describe('Teste no endpoint de login', () => {
  beforeEach(() => {
    createTableUsers();
  });

  afterEach(() => {
    deleteTableUsers();
    autoIncrementTableUsers();
  });

  it('Verifica se é possível fazer login com usuário inexistente', async () => {
    insertUsers();
    await frisby
      .post(`${url}/user/login`,
        {
          email: 'fulano@mail.com',
          password: '123456'
        })
      .expect('status', StatusCodes.NOT_FOUND)
      .then((response) => {
        const { body } = response;
        console.log('body', body);
        const result = JSON.parse(body);
        expect(result.message).toBe('usuário ou senha incorreto');
      });
  });

  it('Verifica se é possível fazer login com senha de usuário incorreta', async () => {
    insertUsers();
    await frisby
      .post(`${url}/user/login`,
        {
          email: 'tryber@trybe.com.br',
          password: 'senha123456'
        })
      .expect('status', StatusCodes.NOT_FOUND)
      .then((response) => {
        const { body } = response;
        console.log('body', body);
        const result = JSON.parse(body);
        expect(result.message).toBe('usuário ou senha incorreto');
      });
  });

  it('Verifica se é possível fazer login com usuário existente e senha correta', async () => {
    insertUsers();
    await frisby
      .post(`${url}/user/login`,
        {
          email: 'tryber@trybe.com.br',
          password: '123456'
        })
      .expect('status', StatusCodes.OK)
      .then((response) => {
        const { body } = response;
        console.log('body', body);
        const result = JSON.parse(body);
        console.log('result', result);
      });
  });
})