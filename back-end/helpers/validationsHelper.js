const { CustomError } = require('./errorHelper');
const STATUS_CODE = require('./statusHelper');
const STATUS_MESSAGE = require('./msgHelper');
const { orderModels } = require('../models');

// No magic numbers
const SIX = 6;
const TWELVE = 12;
const ZERO = 0;

// userServices 
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

// saleServices
const checkIfDataExist = (data) => {
  if (!data) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checkTotalPriceValue = (totalPrice) => {
  if (typeof totalPrice !== 'number' || totalPrice < 0) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checkDeliveryNumberValue = (deliveryNumber) => {
  if (typeof deliveryNumber !== 'number' || deliveryNumber < 0) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checkProductsSalesValue = (productsSales) => {
  if (productsSales.length < ZERO) {
    throw new CustomError({
      status: STATUS_CODE.BAD_REQUEST,
      message: STATUS_MESSAGE.INVALID_ENTIRES,
    });
  }
};

const checkIsAdmin = (role) => {
  if (role !== 'administrator') {
    throw new CustomError({
      status: STATUS_CODE.UNAUTHORIZED,
      message: STATUS_MESSAGE.NOT_AUTHORIZED,
    });
  }
};

const checkIfOrderBelongUser = async (idUser, id) => {
  const check = await orderModels.checkIfOrderBelongUser(idUser, id);
  if (!check) {
    throw new CustomError({
      status: STATUS_CODE.UNAUTHORIZED,
      message: STATUS_MESSAGE.NOT_AUTHORIZED,
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
  checkIfDataExist,
  checkTotalPriceValue,
  checkDeliveryNumberValue,
  checkProductsSalesValue,
  checkIsAdmin,
  checkIfOrderBelongUser,
};
