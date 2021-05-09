const { saleModels, userModels } = require('../models');
const { STATUS_MESSAGE, validationsHelper } = require('../helpers');

const getUserIdFromEmail = async (email) => {
  const result = await userModels.findUserByEmail(email);
  validationsHelper.checksIfUserHasBeenReturned(result);

  return result[0].id;
};

// Source: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
const getDate = () => {
  const date = new Date().toISOString().slice(0, 10);
  const hour = new Date().toLocaleTimeString('pt-br', { timeZone: 'America/Sao_Paulo' });
  const result = `${date} ${hour}`;
  return result;
};

const createSaleProducts = async (saleId, productsSales) => {
  productsSales.forEach(async (product) => {
    await saleModels.createSaleProducts(saleId, product.id, product.quantity);
  });
  return STATUS_MESSAGE.CREATED_SALE;
};

const createSale = async (purchaseRequest) => {
  validationsHelper.checkIfDataExist(purchaseRequest.email);
  validationsHelper.checkIfDataExist(purchaseRequest.total_price);
  validationsHelper.checkIfDataExist(purchaseRequest.delivery_address);
  validationsHelper.checkIfDataExist(purchaseRequest.delivery_number);
  validationsHelper.checkIfDataExist(purchaseRequest.products_sales);
  validationsHelper.checkIfEmailIsValid(purchaseRequest.email);
  validationsHelper.checkTotalPriceValue(purchaseRequest.total_price);
  validationsHelper.checkDeliveryNumberValue(purchaseRequest.delivery_number);
  validationsHelper.checkProductsSalesValue(purchaseRequest.products_sales);

  const userId = await getUserIdFromEmail(purchaseRequest.email);
  const date = getDate();
  const completedSale = await saleModels.createSale(userId, purchaseRequest, date, 'pendent');
  const result = await createSaleProducts(completedSale.insertId, purchaseRequest.products_sales);
  return result;
};

module.exports = {
  createSale,
};
