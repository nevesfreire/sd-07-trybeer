const { CustomError } = require('./errorHelper');
const { STATUS_CODE } = require('./statusHelper');
const { STATUS_MESSAGE } = require('./msgHelper');

//-- userServices 
const SIX = 6;
const TWELVE = 12;

const checkIfEmailAndPasswordExist = (email, password) => {
  if (!email || !password) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checkIfEmailIsValid = (email) => {
  const regex = /\S+@\S+\.\S+/.test(email); // Source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  if (!regex) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checkIfPasswordIsValid = (password) => {
  if (password.length < SIX) {
    throw new CustomError({
      status: STATUS_CODE.UNAUTHORIZED,
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

const checkIfNameEmailPasswordAndSellerExist = (name, email, password, seller) => {
  if (!name || !email || !password || seller === null) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checkIfNameIsValid = (name) => {
  const regex = /[^a-zA-Z ]/g.test(name);
  if (regex || name.length < TWELVE) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checkIfEmailExist = (result) => {
  if (result.length) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.DUPLICATED_EMAIL,
    });
  }
};

const checkIfEmailAndNameExist = (name, email) => {
  if (!name || !email) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checkIfUserIsOwner = (emailFromBody, emailFromToken) => {
  if (emailFromBody !== emailFromToken) {
    throw new CustomError({
      status: STATUS_CODE.UNAUTHORIZED,
      message: STATUS_MESSAGE.EMAIL_NOT_EQUAL,
    });
  }
};

//-- saleServices
const checkVerifyIFDataExist = (email, total_price, delivery_address, delivery_number, products_sales) => {
  if (!email || !total_price || !delivery_address || !delivery_number || !products_sales) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
}

const checkTotalPriceValue = (total_price) => {
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

module.exports = {
  checkIfEmailAndPasswordExist,
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  checksIfUserHasBeenReturned,
  checkIfNameEmailPasswordAndSellerExist,
  checkIfNameIsValid,
  checkIfEmailExist,
  checkIfEmailAndNameExist,
  checkIfUserIsOwner,
  checkVerifyIFDataExist,
  checkTotalPriceValue,
  checkDeliveryNumberValue,
  checkProductsSalesValue,
};