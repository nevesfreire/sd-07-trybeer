const salesModel = require('../models/Checkout');

const saveSales = async (saleObj) => {
    console.log('no service: ', saleObj);
    const sales = await salesModel.savePurchases(saleObj);
    return sales;
};

module.exports = {
    saveSales,
};