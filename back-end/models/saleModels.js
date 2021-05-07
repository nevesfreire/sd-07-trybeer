const connection = require('./connection');

const createSale = async (user_id, total_price, delivery_address, delivery_number, sale_date, status) => {
  const [result] = await connection.execute('INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status) VALUES (?, ?, ?, ?, ?, ?)', [user_id, total_price, delivery_address, delivery_number, sale_date, status]);
  return result;
};

const createSaleProducts = async(sale_id, id, quantity) => {
  const [result] = await connection.execute('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', [sale_id, id, quantity]);
  return result;
}

module.exports = {
  createSale,
  createSaleProducts,
};