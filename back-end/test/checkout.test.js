const request = require('supertest');
const app = require('../server');
const connection = require('../models/connection');

describe('Testar a rota de checkout', () => {
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
      done();
  });
  it('Deve realizar a inserção de sale checkout', async (done) => {
    const CREATE = 201;
    const res = await request(app)
      .post('/checkout')
      .send({
        user_id: 2,
        total_price: '3.49',
        delivery_address: 'Rua de cima',
        delivery_number: '322',
        saleselect_date: Date.now(),
        status: "Pendente",
        cart: [ [ 11, '3.49', 1, 'Stella Artois 275ml' ] ]
      })
    console.log(res.body);
    expect(res.statusCode).toBe(CREATE);
    connection.end();
    done();
  })
  it('Deve confirmar que "meus pedidos" esta vazio', async (done) => {
    const ERROR = 404;
    const res = await request(app)
    .patch('/orders')
    // .send({status: "Pendente"})
    expect(res.statusCode).toBe(ERROR)
    connection.end();
    done();
  })
  // it('Deve confirmar que o produto não foi entregue', async (done) => {
  //   const ERROR = 400;
  //   const res = await request(app)
  //   .patch('/checkout')
  //   .send({status: "Pendente"})
  //   expect(res.statusCode).toBe(ERROR)
  //   connection.end();
  //   done();
  // })
});
