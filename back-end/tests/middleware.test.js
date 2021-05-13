const request = require('supertest');
const express = require('express');
const connect = require('../models/connection');
const { generateToken } = require('./generateToken');
const { sale } = require('../routes');

const app = express();
app.use(express.json());
app.use(sale);
const salesUser = '/sales/users';

const token = generateToken('invalid');
const contentType = 'Content-Type';
const applicationJson = 'application/json';
const invalidToken = { authorization: token.token, applicationJson };
const errorToken = { err: { message: 'Invalid token' } };

it('Não é possivel logar utilizando um token invalido', (done) => request(app)
  .post(salesUser)
  .set(invalidToken)
  .set('Accept', applicationJson)
  .expect(contentType, /json/)
  .expect(401, errorToken, done));

afterAll(async () => connect.end());