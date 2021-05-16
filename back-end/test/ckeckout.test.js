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
    // it('Não deve retornar vendas', async (done) => {
    //     const ERROR = 400;
    //     const res = await request(app)
    //       .get('/checkout');
    //     if (res.body.message === 'sales not found') {
    //         expect(res.statusCode).toBe(ERROR);
    //     }
    //     connection.end();
    //     done();
    // });
    //

    it('Deve retornar a venda checkout pelo id', async (done) => {
        const OK = 200;
        const res = await request(app)
          .get(`/checkout/${1}`)
        console.log(res.body)
        expect(res.statusCode).toBe(OK);
        connection.end();
        done();
    });
});
