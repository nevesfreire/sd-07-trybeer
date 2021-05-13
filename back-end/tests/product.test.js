const request = require('supertest');
const express = require('express');
const { product } = require('../routes');
const connect = require('../models/connection');
const generateToken = require('./generateToken');

const app = express();
app.use(express.json());
app.use(product);

const token = generateToken();
const contentType = 'Content-Type';
const applicationJson = 'application/json';
const validToken = { authorization: token.token, applicationJson };
const invalidToken = { err: { name: 'JsonWebTokenError', message: 'jwt must be provided' } };

it('Não é deve ser possivel acessar a rota sem ter um token válido', (done) => 
  request(app)
    .get('/products')
    .set('Accept', applicationJson)
    .expect(contentType, /json/)
    .expect(401, invalidToken, done));

it('É possivel acessar a rota com um token válido', (done) => 
  request(app)
    .get('/products')
    .set('Accept', applicationJson)
    .set(validToken)
    .expect(contentType, /json/)
    .expect(200, done));

    afterAll(async () => connect.end());