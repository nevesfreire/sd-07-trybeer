const SaleModel = require('../model/SaleModel');

const create = async (sale, authorization) => {
  const decoded = jwt.decodeToken(authorization);

  // logica create sale
  // logica loop product_quantity
  const products = await SaleModel.create();
  return products;
};

module.exports = { create };
