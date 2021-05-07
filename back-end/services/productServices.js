const { productModels } = require('../models');

const getProductsList = async () => {
  const result = await productModels.getProductsList();
  return result;
};

module.exports = {
  getProductsList,
};