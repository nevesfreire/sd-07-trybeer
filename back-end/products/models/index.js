const conn = require('../../models/connection');

const getAll = async () => {
  const query = 'SELECT * FROM products;';
  const [data] = await conn.execute(query);
  return data;
};

const createSale = async (idUser, totalProducts, street, houseNumber, status) => {
  const query = 'INSERT INTO sales(user_id, total_price, delivery_address, delivery_number, sale_date, status) ' +
  'VALUES (?, ?, ?, ?, NOW(), ?)';
  const [data] = await conn.execute(query, [idUser, totalProducts, street, houseNumber, status]);
  return data;
};

const createProductsSales = async (sale_id, product_id, quantity) => {
  const query = 'INSERT INTO sales_products(sale_id, product_id, quantity) ' +
  'VALUES (?, ?, ?)';
  const [data] = await conn.execute(query, [sale_id, product_id, quantity]);
  return data;
};

module.exports = {
  getAll,
  createSale,
  createProductsSales,
};
