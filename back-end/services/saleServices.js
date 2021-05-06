const { saleModels, userModels } = require('../models');
const { CustomError, STATUS_CODE, STATUS_MESSAGE } = require('../helpers');

const verifyIFDataExist = (email, total_price, delivery_address, delivery_number, products_sales) => {
  if (!email || !total_price || !delivery_address || !delivery_number || !products_sales) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
}

const checkIfEmailIsValid = (email) => {
  const regex = /\S+@\S+\.\S+/.test(email); // Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  if (!regex) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checkTotalPriceValue = (total_price) => {
  console.log(typeof total_price);
  if (typeof total_price !== 'number' || total_price < 0) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checkDeliveryNumberValue = (delivery_number) => {
  if (typeof delivery_number !== 'number' || delivery_number < 0) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checkProductsSalesValue = (products_sales) => {
  if (products_sales.length < 0) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checksIfUserHasBeenReturned = (result) => {
  if (!result.length) {
    throw new CustomError({
      status: STATUS_CODE.UNPROCESSABLE_ENTITY,
      message: STATUS_MESSAGE.USER_NOT_FOUND,
    });
  }
};

const getUserIdFromEmail = async (email) => {
  const result = await userModels.findUserByEmail(email);
  checksIfUserHasBeenReturned(result);

  return result[0].id;
};


const createSale = async (email, total_price, delivery_address, delivery_number, products_sales) => {
  verifyIFDataExist(email, total_price, delivery_address, delivery_number, products_sales);
  checkIfEmailIsValid(email);
  checkTotalPriceValue(total_price);
  checkDeliveryNumberValue(delivery_number);
  console.log('entrou no services')
  checkProductsSalesValue(products_sales);
  const userId = await getUserIdFromEmail(email);
  const date = "2021-05-06";
  const status = "pendent";
  const result = await saleModels.createSale(userId, total_price, delivery_address, delivery_number, date, status);  
  return result;
};

module.exports = {
  createSale,
};