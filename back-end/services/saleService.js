const convertDate = require('../helpers/convertDate');
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

const getSale = async (id) => {
    const data = await model.getSale(id);
    data.forEach((obj) => {
        convertDate(obj);
    });
    return data;
};

module.exports = {
    createSale,
    getSale,
};
