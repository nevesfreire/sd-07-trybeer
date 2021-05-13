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

const getOrder = async (id) => {
  const query = 'SELECT * FROM Trybeer.sales_products SP'
  + ' INNER JOIN Trybeer.products P ON P.id = SP.product_id'
  + ' WHERE sale_id = ?;';
  const [data] = await conn.execute(query, [id]);
  return data;
};


module.exports = {
  getAll,
  getAllSalesProducts,
  getOrder,
};