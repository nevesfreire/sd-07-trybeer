const { saleModels, userModels } = require('../models');
const { CustomError, STATUS_MESSAGE, validationsHelper } = require('../helpers');

const getUserIdFromEmail = async (email) => {
  const result = await userModels.findUserByEmail(email);
  validationsHelper.checksIfUserHasBeenReturned(result);

  return result[0].id;
};

// Source: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
const getDate = () => new Date().toISOString().slice(0, 10)+" "+new Date().toLocaleTimeString('pt-br', { timeZone: 'America/Sao_Paulo' });

const createSaleProducts =  async (sale_id, products_sales) => {
  products_sales.forEach( async (product) => {
    await saleModels.createSaleProducts(sale_id, product.id, product.quantity)
  });
  return STATUS_MESSAGE.CREATED_SALE;
}


const createSale = async (email, total_price, delivery_address, delivery_number, products_sales) => {
  validationsHelper.checkVerifyIFDataExist(email, total_price, delivery_address, delivery_number, products_sales);
  validationsHelper.checkIfEmailIsValid(email);
  validationsHelper.checkTotalPriceValue(total_price);
  validationsHelper.checkDeliveryNumberValue(delivery_number);
  validationsHelper.checkProductsSalesValue(products_sales);

  const userId = await getUserIdFromEmail(email);
  const date = getDate();
  const completedSale = await saleModels.createSale(userId, total_price, delivery_address, delivery_number, date, 'pendent');
  const result = await createSaleProducts(completedSale.insertId, products_sales);
  return result;
};

module.exports = {
  createSale,
};