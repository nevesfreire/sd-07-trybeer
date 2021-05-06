const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const CustomError = require('../customErrors/CustomError');
const productModel = require('../models/productModel');

const { secret } = require('../auth/secret.json');

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return (products);
};

module.exports = { 
  getAllProducts,
 };