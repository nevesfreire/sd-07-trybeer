const { orderModels } = require('../models');
const { decodeToken } = require('../auth');
const { userModels } = require('../models');
const { validationsHelper } = require('../helpers');

const getUserIdFromEmail = async (email) => {
  const result = await userModels.findUserByEmail(email);
  validationsHelper.checksIfUserHasBeenReturned(result);

  return result[0].id;
};

const getOrdersUser = async (token) => {
  const decodedToken = decodeToken.decode(token);
  const idUser = await getUserIdFromEmail(decodedToken.email);
  const result = await orderModels.getOrdersUser(idUser);

  return result;
};

const getOrdersAdmin = async (token) => {
  const decodedToken = decodeToken.decode(token);
  validationsHelper.checkIsAdmin(decodedToken.role);
  const result = await orderModels.getOrdersAdmin();

  return result;
};

const getOrderDetails = async (id, token) => {
  const decodedToken = decodeToken.decode(token);
  const idUser = await getUserIdFromEmail(decodedToken.email);
  await validationsHelper.checkIfOrderBelongUser(idUser, id);
  const result = await orderModels.getOrderDetails(id);

  return result;
};

const getOrderDetailsAdmin = async (token, id) => {
  const decodedToken = decodeToken.decode(token);
  validationsHelper.checkIsAdmin(decodedToken.role);
  const result = await orderModels.getOrderDetails(id);

  return result;
};

const changeStatus = async (id, situation, token) => {
  const decodedToken = decodeToken.decode(token);
  validationsHelper.checkIsAdmin(decodedToken.role);
  const result = await orderModels.changeStatus(id, situation);

  return result;
};

module.exports = {
  getOrdersUser,
  getOrdersAdmin,
  getOrderDetails,
  changeStatus,
  getOrderDetailsAdmin,
};
