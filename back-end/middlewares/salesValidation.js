const { StatusCodes: { UNAUTHORIZED } } = require('http-status-codes');
const { userPasswordMessage } = require('../messages');

const emailValidationMiddleware = (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) {
    return res.status(UNAUTHORIZED).json(userPasswordMessage);
  }
  next();
};

const priceValidationMiddleware = (req, res, next) => {
  const { price } = req.body;
  if (!price || price === '') {
    return res.status(UNAUTHORIZED).json(userPasswordMessage);
  }
  next();
};

const addressValidationMiddleware = (req, res, next) => {
  const { address } = req.body;
  if (!address || address === '') {
    return res.status(UNAUTHORIZED).json(userPasswordMessage);
  }
  next();
};

const deliveryNumberValidationMiddleware = (req, res, next) => {
  const { deliveryNumber } = req.body;
  if (!deliveryNumber || deliveryNumber === '') {
    return res.status(UNAUTHORIZED).json(userPasswordMessage);
  }
  next();
};

const saleDateValidationMiddleware = (req, res, next) => {
  const { saleDate } = req.body;
  if (!saleDate || saleDate === '') {
    return res.status(UNAUTHORIZED).json(userPasswordMessage);
  }
  next();
};

const salesStatusValidationMiddleware = (req, res, next) => {
  const { salesStatus } = req.body;
  if (!salesStatus || salesStatus === '') {
    return res.status(UNAUTHORIZED).json(userPasswordMessage);
  }
  next();
};

const productsValidationMiddleware = (req, res, next) => {
  const { products } = req.body;
  if (!products || products === '') {
    return res.status(UNAUTHORIZED).json(userPasswordMessage);
  }
  next();
};

const productsCampsValidationMiddleware = (req, res, next) => {
  const { products: { productName, quantity } } = req.body;
  if (!productName || productName === '') {
    return res.status(UNAUTHORIZED).json(userPasswordMessage);
  }
  if (!quantity || quantity === '') {
    return res.status(UNAUTHORIZED).json(userPasswordMessage);
  }
  next();
};

module.exports = {
  emailValidationMiddleware,
  priceValidationMiddleware,
  addressValidationMiddleware,
  deliveryNumberValidationMiddleware,
  saleDateValidationMiddleware,
  salesStatusValidationMiddleware,
  productsValidationMiddleware,
  productsCampsValidationMiddleware,
};