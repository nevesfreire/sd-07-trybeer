const nock = require('nock');
const request = require('supertest');
const app = require('../server');
const connection = require('../models/connection');

describe('Deve testar a rota de orders', () => {
    const OK = 200;
    beforeAll(async () => {
        await connection.execute('INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status) VALUES (1, "3.49", "aa", "1", now(), "Pendente")');
        await connection.execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (1, 11, 1)');
    });
    it('Deve retornar todas as ordens', async (done) => {
        const res = await request(app).get('/orders');
        expect(res.statusCode).toBe(OK);
        done();
    });
    it('Deve retornar as ordens por id do usuario', async (done) => {
        const res = await request(app).get(`/orders/${1}`);
        expect(res.statusCode).toBe(OK);
        done();
    });
    it('Deve retornar os detalhes por id da ordem', async (done) => {
        const res = await request(app).get(`/orders/details/${1}`);
        expect(res.statusCode).toBe(OK);
        done();
    });

    it('Não deve retornar retornar as ordens por id inexistente de usuario', async (done) => {
        const res = await request(app).get(`/orders/${1000000000}`);
        const ERRORBYID = 404;
        expect(res.statusCode).toBe(ERRORBYID);
        done();
    });

    it('Não deve retornar detalhes com ordem id inexistente', async (done) => {
        const res = await request(app).get(`/orders/details/${1000000000000000000}`);
        const ERROR = 400;
        expect(res.statusCode).toBe(ERROR);
        connection.end();
        done();
    });    
});

// describe('Caso de erro com mock', () => {
//     beforeEach( async () => {
//       nock.cleanAll();
//     });
//     it('Não deve retornar as orders', async (done) => {
//        const objRes = { message: 'orders not found'};
//         nock('http://localhost:3001/orders')
//           .get('/orders')
//           .reply(400, objRes);
//         const res = await request(nock)
//           .get('/orders')
//         console.log(res.body)
//         expect(res.statusCode).toDeepEqual(objRes);
//         // expect(res.body.message).toEqual("orders not found");
//         connection.end();
//         done();
//     });
// });
