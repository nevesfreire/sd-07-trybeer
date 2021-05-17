const request = require('supertest');
const app = require('../server');
const connection = require('../models/connection');

describe('Testar a rota de checkout', () => {
  beforeEach(async () => {
    await connection.execute('INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status) VALUES (2, "3.49", "aa", "1", now(), "Pendente")');
    await connection.execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (4, 11, 1)');
  });
  it('Deve retornar todas as vendas em checkout', async (done) => {
      const OK = 200;
      const res = await request(app)
        .get('/checkout')
      expect(res.statusCode).toBe(OK);
      done();
  });
  
  it('Deve retornar a venda checkout pelo id', async (done) => {
      const OK = 200;
      const res = await request(app)
        .get(`/checkout/${1}`)
      expect(res.statusCode).toBe(OK);
      connection.end();
      done();
  });
  it('Deve criar checkout sale', async () => {
    const res = await request(app)
      .post('/checkout')
      .send({
        
      })
  })


});
