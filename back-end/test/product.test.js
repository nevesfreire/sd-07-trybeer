const frisby = require('frisby');
const messages = require('../helpers/dictonary');

const url = 'http://localhost:3001';

describe('Valida o endpoint para obter os produtos.', () => {

  const users = [
    { name: 'Tryber Admin', email: 'tryber@trybe.com.br', password: '123456', role: 'administrator' },
    { name: 'testuser', email: 'user@test.com', password: 'test123', role: 'client'}
  ];

  it('Será validado que não é possível listar todas os produtos sem estar autenticado', async () => {
    await frisby
      .get(`${url}/products/`)
      .expect('status', 401);
  });

  it('Será validado que é possível listar todos os produtos estando autenticado', async () => {
    await frisby
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
          })
          .get(`${url}/products/`)
          .expect('status', 200)
          .then((responseProducts) => {
            const { json } = responseProducts;
            expect(json[0].id).toBe(1);
            expect(json[0].name).toBe('Skol Lata 250ml');
            expect(json[0].price).toBe('2.20');
            expect(json[0].url_image).toBe(
              'http://localhost:3001/images/Skol Lata 350ml.jpg',
            );
            expect(json[1].id).toBe(2);
            expect(json[1].name).toBe('Heineken 600ml');
            expect(json[1].price).toBe('7.50');
            expect(json[1].url_image).toBe('http://localhost:3001/images/Heineken 600ml.jpg');
          });
      });
  });
});
