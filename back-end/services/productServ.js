const productModels = require('../models/productModels');

const getProducts = async () => {
  try {
    return productModels.getAll();
  } catch (error) {
    return 'Azedou';
  }
};

module.exports = { getProducts };
