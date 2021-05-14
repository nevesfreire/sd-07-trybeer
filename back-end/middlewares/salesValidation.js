const {
  StatusCodes: { UNAUTHORIZED },
} = require('http-status-codes');
const {
  emailSaleMessage,
  priceSaleMessage,
  addressSaleMessage,
  deliveryNumberSaleMessage,
  statusSaleMessage,
  productsSaleMessage,
  productsCampSaleMessage,
} = require('../messages');

const emailValidationMiddleware = (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) {
    return res.status(UNAUTHORIZED).json(emailSaleMessage);
  }
  next();
};

const priceValidationMiddleware = (req, res, next) => {
  const { price } = req.body;
  if (!price || price === '') {
    return res.status(UNAUTHORIZED).json(priceSaleMessage);
  }
  next();
};

const addressValidationMiddleware = (req, res, next) => {
  const { address } = req.body;
  if (!address || address === '') {
    return res.status(UNAUTHORIZED).json(addressSaleMessage);
  }
  next();
};

const deliveryNumberValidationMiddleware = (req, res, next) => {
  const { deliveryNumber } = req.body;
  if (!deliveryNumber || deliveryNumber === '') {
    return res.status(UNAUTHORIZED).json(deliveryNumberSaleMessage);
  }
  next();
};

const salesStatusValidationMiddleware = (req, res, next) => {
  const { salesStatus } = req.body;
  if (!salesStatus || salesStatus === '') {
    return res.status(UNAUTHORIZED).json(statusSaleMessage);
  }
  next();
};

const productsValidationMiddleware = (req, res, next) => {
  const { products } = req.body;
  if (!products || products === '') {
    return res.status(UNAUTHORIZED).json(productsSaleMessage);
  }
  next();
};

const productsCampsValidationMiddleware = (req, res, next) => {
  const { products } = req.body;
  products.map((product) => {
    const { productName, quantity } = product;
    if (!productName || productName === '') {
      return res.status(UNAUTHORIZED).json(productsCampSaleMessage);
    }
    if (!quantity || quantity === '') {
      return res.status(UNAUTHORIZED).json(productsCampSaleMessage);
    }
  return null;
  });
  next();
};

module.exports = {
  emailValidationMiddleware,
  priceValidationMiddleware,
  addressValidationMiddleware,
  deliveryNumberValidationMiddleware,
  salesStatusValidationMiddleware,
  productsValidationMiddleware,
  productsCampsValidationMiddleware,
};
