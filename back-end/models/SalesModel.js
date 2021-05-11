const conn = require('../database');

const create = async (userId, total, deliveryAddress, deliveryNumber) => {
  const status = 'Pendente';
  const dateFormat = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const query = 'INSERT INTO sales '
    + '(user_id, total_price, delivery_address, delivery_number, sale_date, status)'
    + 'VALUES (?,?,?,?,?,?)';
  const values = [userId, total, deliveryAddress, deliveryNumber, dateFormat, status];
  const [ResultSetHeader] = await conn.execute(query, values);
  return ResultSetHeader.insertId;
};

const findByUserId = async (userId) => {
  const query = 'SELECT id, total_price, sale_date FROM sales WHERE user_id=?';
  const values = [userId];
  const [sale] = await conn.execute(query, values);
  return sale;
};

const addSaleProducts = async (saleId, productId, quanity) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity)'
    + 'VALUES (?,?,?)';
  const values = [saleId, productId, quanity];
  await conn.execute(query, values);
};

// const getSaleProducts = async (saleId) => {
//   const query = 'SELECT s.id, s.sale_date, s.total_price, sp.quantity, p.name, p.price '
//     + 'FROM sales_products AS sp '
//     + 'JOIN sales AS s ON sp.sale_id = s.id '
//     + 'JOIN products AS p ON sp.product_id = p.id';
// };

module.exports = {
  create,
  findByUserId,
  addSaleProducts,
};