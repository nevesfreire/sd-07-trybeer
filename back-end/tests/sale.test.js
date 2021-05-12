const request = require('supertest');
const express = require('express');
const connect = require('../models/connection');

const generateToken = require('./generateToken');
const { sale } = require('../routes');

const app = express();
app.use(express.json());
app.use(sale);

const token = generateToken();
const contentType = 'Content-Type';
const applicationJson = 'application/json';
const validToken = { authorization: token.token, applicationJson };
const salesUser = '/sales/users';

const invalidToken = { err: { name: 'JsonWebTokenError', message: 'jwt must be provided' } };
const errorInvalidQuantity = { err: { message: '"quantity" must be greater than or equal to 1' } };
const errorInvalidAddress = { err: { message: '"deliveryAddress" is not allowed to be empty' } };
const errorInvalidDeliveryNumber = { err: { message: '"deliveryNumber" must be a number' } };
const quantityRequired = { err: { message: '"quantity" is required' } };
const addressRequired = { err: { message: '"deliveryAddress" is required' } };
const nameRequired = { err: { message: '"productName" is required' } };

const createdSale = { message: 'Compra realizada com sucesso!' };

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

it('Não é deve ser possivel cadastrar uma compra sem ter um token valido', (done) => request(app)
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

it('Não deve ser possivel listar comprar sem um token valido', (done) => request(app)
  .get(salesUser)
  .expect(contentType, /json/)
  .expect(401, done));

it('Deve ser possivel listar compras pelo id da compra', (done) => request(app)
  .get('/sales/users/1')
  .set(validToken)
  .expect(contentType, /json/)
  .expect(200, done));

it('Não deve ser possivel listar uma compra pelo id que não pertença ao usuario', (done) => 
  request(app)
    .get('/sales/users/99')
    .set(validToken)
    .expect(contentType, /json/)
    .expect(404, done));

afterAll(async () => connect.end());

/*
Validações pendentes:
  - Não está sendo válidado se o produto cadastrado existe.

Falta testar:
 - '/sales/admin'
 - '/sales/admin/:saleid'
*/