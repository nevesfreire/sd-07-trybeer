const { connection } = require('../config/conn');

const selectAllOrders = `SELECT s.id, s.total_price AS price, s.sale_date
AS orderDate
FROM sales AS s
INNER JOIN users AS u ON s.user_id = u.id
WHERE email=?
ORDER BY id`;

const getOrders = async (email) => {
  const [orders] = await connection.execute(selectAllOrders, [email]);
  console.log('orders model', orders);
  return orders;
};

module.exports = {
  getOrders,
};
