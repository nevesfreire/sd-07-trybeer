const SaleModel = require('../model/SaleModel');
const ProductService = require('./ProductService');
const SalesProductsModel = require('../model/SalesProductsModel');
const jwt = require('../helper/jwt');

const create = async (dAddress, dNumber, listProducts, authorization) => {
  const decoded = jwt.decodeToken(authorization);
  const produtosLista = await ProductService.getAll();
  const tPrice = Object.entries(listProducts).reduce((acc, product) => {
    const productQuantity = Number(product[1]);
    const productPrice = produtosLista[0].find((p) => p.id === Number(product[0])).price;
    return acc + (productQuantity * productPrice);
  }, 0);
  const allPropeties = {
    userId: decoded.id, tPrice, dAddress, dNumber, date: new Date(), status: 'pendente',
  };

  const newSaleId = await SaleModel.create(allPropeties);
  Promise.all(
    Object.entries(listProducts).map((p) => SalesProductsModel.create(newSaleId, p[0], p[1])),
  );
};

const getAll = async () => {
  const sales = await SaleModel.getAll();
  return sales;
};

module.exports = { create, getAll };
