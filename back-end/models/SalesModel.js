const conn = require('../database');

const create = async (userId, total, deliveryAddress, deliveryNumber) => {
  const status = 'Pendente';
  const dateFormat = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const query = 'INSERT INTO sales '
    + '(user_id, total_price, delivery_address, delivery_number, sale_date, status)'
    + 'VALUES (?,?,?,?,?,?)';
  const values = [userId, total, deliveryAddress, deliveryNumber, dateFormat, status];

  await conn.execute(query, values);
};

const findByUserId = async (userId) => {
  const query = 'SELECT id, total_price, sale_date FROM sales WHERE user_id=?';
  const values = [userId];
  const [sale] = await conn.execute(query, values);
  return sale;
};

module.exports = {
  create,
  findByUserId,
};