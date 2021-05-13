const conn = require('../../models/connection');

const getAll = async () => {
  const query = 'SELECT * FROM sales;';
  const [data] = await conn.execute(query);
  return data;
};

const getAllSalesProducts = async () => {
  const query = 'SELECT * FROM sales_products;';
  const [data] = await conn.execute(query);
  return data;
};

module.exports = {
  getAll,
  getAllSalesProducts,
};