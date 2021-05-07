const model = require('../models/saleModel');

const createSale = async (obj) => {
    const { products } = obj;
    const date = new Date().toISOString()
    .replace('T', ' ')
    .replace('Z', '');
    const SaleID = await model.createSale({ ...obj, date });
    const response = await model.createSaleProduct(products, SaleID);
    return response;
};

const getSale = (data) => data;

module.exports = {
    createSale,
    getSale,
};
