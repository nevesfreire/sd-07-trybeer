const productsModel = require('../model/productsModel');

const productsAll = async () => {
  // retirar esse comentário
  const products = await productsModel.getAllProducts();
  return products;
};

module.exports = {
  productsAll,
};
