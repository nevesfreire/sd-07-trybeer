const salesModel = require('../models/Sales');
const salesProductModel = require('../models/SalesProduct');

const saveSales = async (saleObj) => {
  const { cart } = saleObj;
  const sales = await salesModel.savePurchases(saleObj);

  cart.forEach(({ id, quantidade }) => {
    salesProductModel.createSalesProductBySalesIdAndProductId(
      sales.insertId,
      id,
      quantidade,
    );
  });
  return sales;
};

module.exports = {
  saveSales,
};
