const request = require('supertest');
const express = require('express');
const connect = require('../models/connection');
const db = require('../script');
const { generateToken } = require('./generateToken');
const { sale } = require('../routes');

const app = express();
app.use(express.json());
app.use(sale);

const token = generateToken();
const adminToken = generateToken('admin');
const contentType = 'Content-Type';
const applicationJson = 'application/json';
const validToken = { authorization: token.token, applicationJson };
const adminValidation = { authorization: adminToken.token, applicationJson };
const salesUser = '/sales/users';
const adminRoute = '/sales/admin';
const updateRoute = '/sales/admin/1';
const invalidToken = { err: { message: 'jwt must be provided' } };
const errorInvalidQuantity = { err: { message: '"quantity" must be greater than or equal to 1' } };
const errorInvalidAddress = { err: { message: '"deliveryAddress" is not allowed to be empty' } };
const errorInvalidDeliveryNumber = { err: { message: '"deliveryNumber" must be a number' } };
const quantityRequired = { err: { message: '"quantity" is required' } };
const addressRequired = { err: { message: '"deliveryAddress" is required' } };
const nameRequired = { err: { message: '"productName" is required' } };
const notAdministrator = { err: { message: 'Usuário não é um administrador' } };
const createdSale = { message: 'Compra realizada com sucesso!' };
const sucessChangeStatus = { message: 'Pedido registrado como Entregue' };
const wrongStatus = { err: { message: '"value" must be one of [Pendente, Entregue]' } };
const emptySales = { err: { message: 'Não existem vendas cadastradas' } };

const validSale = [
{
  productName: 'Skol Lata 250ml',
  quantity: 5,
  deliveryAddress: 'Teste',
},
];
const { productName, quantity, deliveryAddress } = validSale[0];
const invalidQuantity = [{ productName, quantity: 0 }];
const invalidAddress = [{ productName, quantity, deliveryAddress: '' }];
const invalidDeliveryNumber = [{ productName, quantity, deliveryAddress, deliveryNumber: '' }];
const withoutName = [{}];
const withoutQuantity = [{ productName }];
const withoutAddress = [{ productName, quantity }];

beforeAll(async () => {
  await connect.execute(db.createSales);
  await connect.execute(db.createSaleProducts);
});

it('Para consultar as vendas dos usuários deverá ser um administrador', (done) => 
  request(app)
    .get(updateRoute)
    .set(validToken)
    .expect(contentType, /json/)
    .expect(403, notAdministrator, done));

it('Não é possivel cadastrar uma compra sem ter um token valido', (done) => request(app)
    .post(salesUser)
    .send(validSale)
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(401, invalidToken, done));

it('Não é possivel cadastrar uma compra com quantidade menor que 1', (done) => request(app)
  .post(salesUser)
  .send(invalidQuantity)
  .set(validToken)
  .set('Accept', applicationJson)
  .expect(contentType, /json/)
  .expect(400, errorInvalidQuantity, done));

it('Não é possivel cadastar uma compra sem o endereço', (done) => request(app)
  .post(salesUser)
  .send(invalidAddress)
  .set(validToken)
  .set('Accept', applicationJson)
  .expect(contentType, /json/)
  .expect(400, errorInvalidAddress, done));

it('Não é possivel cadastrar caso delivery number não seja numero', (done) => request(app)
  .post(salesUser)
  .send(invalidDeliveryNumber)
  .set(validToken)
  .set('Accept', applicationJson)
  .expect(contentType, /json/)
  .expect(400, errorInvalidDeliveryNumber, done));

it('Não é possivel cadastrar caso não tenha quantity', (done) => request(app)
  .post(salesUser)
  .send(withoutQuantity)
  .set(validToken)
  .set('Accept', applicationJson)
  .expect(contentType, /json/)
  .expect(400, quantityRequired, done));

it('Não é possivel cadastrar caso não tenha o deliveryAddress', (done) => request(app)
  .post(salesUser)
  .send(withoutAddress)
  .set(validToken)
  .set('Accept', applicationJson)
  .expect(contentType, /json/)
  .expect(400, addressRequired, done));

it('Não é possivel cadastrar caso não tenha o deliveryAddress', (done) => request(app)
  .post(salesUser)
  .send(withoutName)
  .set(validToken)
  .set('Accept', applicationJson)
  .expect(contentType, /json/)
  .expect(400, nameRequired, done));

it('Não é possivel listar usuário sem compras', (done) => request(app)
  .get(salesUser)
  .set(validToken)
  .expect(contentType, /json/)
  .expect(404, done));

it('É retornada uma lista vazia quando não há nenhuma venda cadastrada.', (done) => 
  request(app)
    .get(adminRoute)
    .set(adminValidation)
    .expect(contentType, /json/)
    .expect(404, emptySales, done));

it('Deve ser possivel cadastrar uma compra', (done) => request(app)
  .post(salesUser)
  .send(validSale)
  .set(validToken)
  .expect(contentType, /json/)
  .expect(201, createdSale, done));

it('Deve ser possível listar as compras realizadas', (done) => request(app)
  .get(salesUser)
  .set(validToken)
  .expect(contentType, /json/)
  .expect(200, done));

it('Deve ser possivel listar compras pelo id da compra', (done) => request(app)
  .get('/sales/users/1')
  .set(validToken)
  .expect(contentType, /json/)
  .expect(200, done));

it('Não deve ser possivel listar uma compra pelo id que não pertença ao usuario', (done) => 
  request(app)
    .get('/sales/users/9999')
    .set(validToken)
    .expect(contentType, /json/)
    .expect(404, done));

it('Apenas o administrador pode consultar todas as vendas do banco', (done) => 
  request(app)
    .get(adminRoute)
    .set(validToken)
    .expect(contentType, /json/)
    .expect(403, notAdministrator, done));

it('O administrador deve ter acesso a todas as vendas cadastradas.', (done) => 
  request(app)
    .get(adminRoute)
    .set(adminValidation)
    .expect(contentType, /json/)
    .expect(200, done));

it('O administrador pode alterar o status de uma venda.', (done) => 
  request(app)
    .put(updateRoute)
    .send({ status: 'Entregue' })
    .set(adminValidation)
    .expect(contentType, /json/)
    .expect(200, sucessChangeStatus, done));

it('Não deve ser possivel atualizar um status pelo mesmo status.', (done) => 
  request(app)
    .put(updateRoute)
    .send({ status: 'Entregue' })
    .set(adminValidation)
    .expect(304, done));

it('O status da venda deve ser Pendente ou Entregue.', (done) => 
  request(app)
    .put(updateRoute)
    .send({ status: 'Xablau' })
    .set(adminValidation)
    .expect(contentType, /json/)
    .expect(400, wrongStatus, done));

it('Para atualizar a venda o usuario deve ser um administrador', (done) => 
  request(app)
    .put(updateRoute)
    .set(validToken)
    .expect(contentType, /json/)
    .expect(403, notAdministrator, done));

it('O status da venda deve ser Pendente ou Entregue.', (done) => 
  request(app)
    .get(updateRoute)
    .set(adminValidation)
    .expect(200, done));

afterAll(async () => {
  await connect.execute('DROP TABLE Trybeer.sales, Trybeer.sales_products;');
  return connect.end();
});

/*
Validações pendentes:
  - Não está sendo válidado se o produto cadastrado existe.
Falta testar:
 - '/sales/admin/:saleid'

 TRUNCATE Trybeer.sales AND Trybeer.sales_products;
*/